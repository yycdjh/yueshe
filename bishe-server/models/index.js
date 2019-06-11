const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bishe_server',{useNewUrlParser:true},function(err){
    if(err){
          console.log("连接失败");
    }else{
          console.log("连接成功");
    }
});


exports.Communication = require('./communication');
exports.User = require('./users');
exports.Task = require('./task');
exports.Img = require('./img');
exports.Information = require('./information');
exports.Chat = require('./chat');
