const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communicationSchema = new Schema({
    communication_name:  String,
    communication_img:String,
    author: String,
    author_id: String,
    author_img:String,
    summary:   String,
    classification: String,
    time:String,
    pass:String,
    comments:[
         {
         user_name: String,
         user_img:String,
         time:String,
         comment:String,
         zan:Number,
         contents:[
            {
               user_name: String,
               user_img:String,
               time:String,
               comment:String,
               zan:Number,
            }
        ]
         }
    ],
    follow:[
        {
            user_name:String,
            user_img:String,

        }
    ]
   
  });

  const Communication = mongoose.model('Communication',communicationSchema,"communication");

  module.exports = Communication;
