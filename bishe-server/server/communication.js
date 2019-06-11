const models = require('../models');
const Communication = models.Communication;

exports.save = function(content,callback){
    let communication = new Communication(content);
    communication.save(callback);
}

exports.find = function(condition,callback){
    Communication.find(condition,callback);
}

exports.findById = function(condition,callback){
    Communication.findById(condition,callback);
}

exports.remove = function(condition,callback){
    Communication.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    Communication.update(condition,update,callback);
}
