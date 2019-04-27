# Component: SCSS Variables [![NPM version][npm-image]][npm-url]

Convert SCSS (or SASS) files to YAML or JSON files which can be read by your component guide (eg Pattern-lab, Fractal). The default mode will just include all variable - value pairs into a Yaml file. The color mode supports Lighten, Darken, Tint and Shade as it converts these values to hex so patternlab can display them.

Referencing variables inside variables is supported, as long as this variable is in the same file. combining variables from multiple files is not supported.


## Install

```
$ npm install --save patternlab-scssvariables
```

## Usage

Example:

```js
var scssVariables = require('patternlab-scssvariables');

 var settings = {
    "src": "icons/_variables.scss",
    "dest": "icons-variables.yml"
  };

  scssVariables(settings);
```

Colors Specific usage:
```js
 var settings = {
    "src": "colors/_variables.scss",
    "dest": "colors-variables.yml"
  };

  scssVariables.color(settings);
```

Fractal Usage (will output the items under 'context' instead of 'items'):
```js
 var settings = {
    "src": "icons/_variables.scss",
    "dest": "icons-variables.json",
    "type": "fractal"
  };

  scssVariables(settings);
```

Input:
```scss
$white: #fff;
$black: #000;
$valid-color--light: #cbf1ab; 

$test: tint(#BADA55, 42%);
$test: shade(#663399, 42%);

$colours: (
    red: (
        light: #fff2f1,
        mid: #ff7369,
        dark: #c90d00
    ),
    blue: (
    lightest: #5e7298,
    light: #404d69
    )
);
```
Output:
```yaml
items:
    - name: $white
      value: '#fff'
    - name: $black
      value: '#000'
    - name: $valid-color--light
      value: '#cbf1ab'
    - name: $test
      value: '#e2efb7'
    - name: $test
      value: '#2a1540'
    - name: $colours.red.light
      value: '#fff2f1'
    - name: $colours.red.mid
      value: '#ff7369'
    - name: $colours.red.dark
      value: '#c90d00'
    - name: $colours.blue.lightest
      value: '#5e7298'
    - name: $colours.blue.light
      value: '#404d69'
```

### Options

| Name             | Type               | Description   |
| ---------------- | ------------------ | ------------- |
| src              | `string`           | A string containing a path to the input file.
| dest             | `string`           | file destination, can be yml, yaml or json |  
| description      | `string`           | Optional description to include in the file |  
| type             | `string`           | set to Fractal to enable fractal support |  

## Changelog
**v1.3.0 - 2018-11-15** 
 - Added Support Fractal
 - Added Support JSON files
 
**v1.2.0 - 2018-07-29** 
 - Added Support for nested sass maps
 
**v1.1.0 - 2017-11-30** 
 - Added Support for Lighten and Darken
 
**v1.0.0 - 2017-11-30** 
 - initial release


[npm-url]: https://www.npmjs.com/package/patternlab-scssvariables
[npm-image]: https://img.shields.io/npm/v/patternlab-scssvariables.svg