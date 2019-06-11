const models = require('../models');
const Img = models.Img;

exports.save = function(content,callback){
    let img = new Img(content);
    img.save(callback);
}

exports.find = function(condition,callback){
    Img.find(condition,callback);
}

exports.findById = function(condition,callback){
    Img.findById(condition,callback);
}

exports.remove = function(condition,callback){
    Img.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    Img.update(condition,update,callback);
}
