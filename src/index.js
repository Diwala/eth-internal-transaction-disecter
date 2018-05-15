require("babel-polyfill");
//var uport = require('./recipies/uport')
import uport from 'recipies/uport/index';
var core = require('./lib')

module.exports = {
  uport: uport,
  core: core
}
