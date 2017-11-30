# Patternlab: SCSS Variables [![NPM version][npm-image]][npm-url]

Convert SCSS (or SASS) files to patternlab readable YAML files. The default mode will just include all variable - value pairs into a Yaml file. The color mode supports Lighten, Darken, Tint and Shade as it converts these values to hex so patternlab can display them.


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
Input:
```scss
$white: #fff;
$black: #000;
$valid-color--light: #cbf1ab; 

$test: tint(#BADA55, 42%);
$test: shade(#663399, 42%);
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
```

### Options

| Name             | Type               | Description   |
| ---------------- | ------------------ | ------------- |
| src              | `string`           | A string containing a path to the input file.
| dest             | `string`           | Yaml file destination |  
| description      | `string`           | Optional description to include in the yaml |  

## Changelog
**v1.1.0 - 2017-11-30** 
 - Added Support for Lighten and Darken
 
 **v1.0.0 - 2017-11-30** 
 - initial release


[npm-url]: https://www.npmjs.com/package/patternlab-scssvariables
[npm-image]: https://img.shields.io/npm/v/patternlab-scssvariables.svg