const models = require('../models');
const Group = models.Group;

exports.save = function(content,callback){
    let group = new Group(content);
    group.save(callback);
}

exports.find = function(condition,callback){
    Group.find(condition,callback);
}

exports.findById = function(condition,callback){
    Group.findById(condition,callback);
}

exports.remove = function(condition,callback){
    Group.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    Group.update(condition,update,callback);
}
