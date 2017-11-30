var scssVariables = require('../index.js');

var settings = {
  "src": "./tests/_color--variables.scss",
  "dest": "notcolor.yml",
  "indicator": "$"
};

scssVariables(settings);

var settings = {
  "src": "./tests/_color--variables.scss",
  "dest": "colorstest.yml",
  "indicator": "$",
  "description": 'Hallo dit is een test'
};

scssVariables.color(settings);