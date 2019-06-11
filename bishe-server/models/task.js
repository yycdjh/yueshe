const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task_name:  String,
    author: String,
    author_img:String,
    summary:   String,
    author_id:String,
    money:Number,
    classification: String, //0-logo设计，1-UI设计，2-广告设计，3-包装设计
    time:String,
    pass:String,
    state:String, //0-未接受，1-接受，2-审核完成，3-完成
    bidding_sum:String,
     
    pick_userid:String,

    bidding_user_arr:[
         {
         user_id: String,
         user_name: String,
         user_img:String,
         time:String,

         }
    ],
    comments:[
      {
      user_name: String,
      user_img:String,
      time:String,
      comment:String,
      contents:[
         {
            user_name: String,
            user_img:String,
            time:String,
            comment:String,
         }
     ]
      }
 ],
    bidding_user_id:String,

   
  });

  const Task = mongoose.model('Task',taskSchema,"task");

  module.exports = Task;
