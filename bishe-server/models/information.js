const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informationSchema = new Schema({
  information_title: String,
  information_contents: String,
  information_author: String,
  information_img: String,
  pass: String,
  time: String

});

const Information = mongoose.model("information", informationSchema, "information");

module.exports = Information;
