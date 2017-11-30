var
  _ = require('lodash'),
  fs = require('fs'),
  yaml = require('js-yaml');

function defaultMode(settings) {
  getValues(settings);
}

function colorMode(settings) {
  settings['mode'] = 'colors';
  getValues(settings);
};

module.exports = defaultMode;
module.exports.color = colorMode;

function getValues(settings, done) {
  var values = readScss(settings);
  var result =  values;
  if (settings.mode === 'colors') {
    result = colorValues(values)
  }
  toYaml(settings, result);
}

function colorLightenDarken(mode, color, value) {
  color = removeCharacter(color, '#');
  var mix = function (color_1, color_2, weight) {
    function d2h(d) {
      return d.toString(16);
    }
    function h2d(h) {
      return parseInt(h, 16);
    }
    weight = (typeof(weight) !== 'undefined') ? weight : 50;
    var color = "#";
    for (var i = 0; i <= 5; i += 2) {
      var v1 = h2d(color_1.substr(i, 2)),
        v2 = h2d(color_2.substr(i, 2)),
        val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
      while (val.length < 2) {
        val = '0' + val;
      }
      color += val;
    }
    return color;
  };

  var modeColor = 'ffffff';
  if (mode !== 'tint'){
    modeColor = '000000';
  }
  var mixed = mix((color), (modeColor), value);
  return mixed
}
function readScss(settings) {
  var data = _.filter(fs.readFileSync(settings.src, 'utf8').split('\n'), item => _.startsWith(item, '$'));
  return _.map(data, (item) => {
      const x = item.split(':');
    return {
      name: x[0].trim(),
      value: x[1].replace(/;.*/, '').trim()
    };
  });
}
function processColor(value) {
  var color = ((value).replace(/(tint\(|shade\()/, ""));
  if(color.includes(',')){
    color = color.substring(0, color.indexOf(','));
  }
  return color
}
function removeCharacter(value, character) {
  return value.replace(character, '')
}
function processTintShade(colorValue, values) {
  var value =  (colorValue.split(',').pop()).match(/\d+/)[0];
  var result;
  var color = processColor(colorValue);
  if (colorValue.includes('$')) {
    var variable = (colorValue).substring((colorValue).lastIndexOf("$"),(colorValue).lastIndexOf(","));
    color = ((_.find(values, { 'name':  variable})).value).substring(1)
  }
  if (colorValue.includes('tint(')) {
    result = colorLightenDarken('tint', color, value);
  } else if (colorValue.includes('shade(')) {
    result = colorLightenDarken('shade', color, value);
  }
 return result
}
function toYaml(settings, values) {
  var contents = {
    items: values
  };
  if (settings.description){
    contents['meta'] = {};
    contents['meta']['description'] = settings.description;
  }
  fs.writeFileSync(settings.dest, yaml.dump(contents));
}
function colorValues(values) {
  result = [];
  values.forEach(function (item) {
    var color = processColor(item.value);
    if (item.value.includes('tint(') || item.value.includes('shade(')){
      color = processTintShade(item.value, values);
    }
    result.push({
      name: item.name,
      value: color
    });
  });
  return result;
}