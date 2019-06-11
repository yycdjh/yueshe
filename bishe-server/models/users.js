const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    user_name:  String,
    user_img:String,
    user: String,
    psw:  String,
    sex:String,
    old:String,
    like: String,
    introduction:String,
    money: Number,
    task:[
    {
    task_id:String,
    task_name:  String,
    author: String,
    author_img:String,
    summary:   String,
    }   
    ],
    communicatin:[{
        type:String
    }],
    comment:[
        {
            type: String
        }
    ],
    
  });

  const User = mongoose.model('User',usersSchema,"user");

  module.exports = User;
