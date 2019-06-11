const models = require('../models');
const Task = models.Task;

exports.save = function(content,callback){
    let task = new Task(content);
    task.save(callback);
}

exports.find = function(condition,callback){
    Task.find(condition,callback);
}

exports.findById = function(condition,callback){
    Task.findById(condition,callback);
}

exports.remove = function(condition,callback){
    Task.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    Task.update(condition,update,callback);
}
