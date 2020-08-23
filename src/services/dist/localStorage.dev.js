"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.each = exports.clearAll = exports.remove = exports.get = exports.save = void 0;

var _store = _interopRequireDefault(require("store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var save = function save(name, value) {
  if (name === undefined) throw new Error("Cant store value with name undefine");
  return _store["default"].set(name, value);
};

exports.save = save;

var get = function get(name) {
  return _store["default"].get(name);
};

exports.get = get;

var remove = function remove(name) {
  _store["default"].remove(name);
};

exports.remove = remove;

var clearAll = function clearAll() {
  _store["default"].clearAll();
};

exports.clearAll = clearAll;

var each = function each(func) {
  _store["default"].each(func);
};

exports.each = each;
var _default = {
  save: save,
  get: get,
  remove: remove,
  clearAll: clearAll,
  each: each
};
exports["default"] = _default;