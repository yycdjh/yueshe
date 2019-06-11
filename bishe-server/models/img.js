const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema({
    img_url:  String,
    time:String,
    user_img:String,
    user_id:String,
    user:String,
    user_name:String,
    img_name:String,

  });

  const Img = mongoose.model('Img',imgSchema,"img");

  module.exports = Img;
