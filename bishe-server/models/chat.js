const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ChatSchema = new Schema({
    user:String,
    from:String,
    to:String,
    body:[{
        chat:String,
        img:String,
        status: Number,
        time:{type:Date, default: Date.now()},
        ttime:{type:String},
        sender:String
    }],
    content: {type:String,default:'0'},
    meta: {
        updateAt: {type:Date, default: Date.now()},
        createAt: {type:Date, default: Date.now()}
    }
});
const Chat = mongoose.model('Chat',ChatSchema,'chat');

module.exports = Chat;