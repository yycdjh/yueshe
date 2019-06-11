const models = require('../models');
const Relation = models.Relation;

exports.save = function(content,callback){
    let relation = new Relation(content);
    relation.save(callback);
}

exports.find = function(condition,callback){
    Relation.find(condition,callback);
}

exports.findById = function(condition,callback){
    Relation.findById(condition,callback);
}

exports.remove = function(condition,callback){
    Relation.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    Relation.update(condition,update,callback);
}
