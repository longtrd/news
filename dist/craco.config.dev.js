"use strict";

var CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [{
    plugin: CracoLessPlugin,
    options: {
      lessLoaderOptions: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            "@primary-color": "#3052B7"
          }
        }
      }
    }
  }]
};