const models = require("../models");
const Information = models.Information;

exports.save = function(content, callback) {
  let information = new Information(content);
  information.save(callback);
};

exports.find = function(condition, callback) {
  Information.find(condition, callback);
};

exports.findById = function(condition, callback) {
  Information.findById(condition, callback);
};

exports.remove = function(condition, callback) {
  Information.remove(condition, callback);
};

exports.update = function(condition, update, callback) {
  Information.update(condition, update, callback);
};
