const express = require('express');
const router = express.Router();

//图片上传改名
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, './public/upload/');    
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);  
    }
});
var upload = multer({storage:storage});


//引入db
let Chat = require('../models/chat');
// let Chat =db.Chat;//表

// let Chat = require('../server/chat');

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

//图片上传
router.post('/upload', upload.any(), function(req, res, next){
    console.log("files---");
    let files = req.files;
    console.log("files",files);
    let result = [];
    for(let i = 0; i < files.length; i++){
        result.push('/upload/' + files[i].filename);
    }
    res.send({result});//图片上传成功回调本地地址
});

router.post('/addchat',function(req,res,next){    //插入聊天记录
    let user = req.body.user;
    let from = req.body.from;
    let to = req.body.to;
    let date = new Date();
    let hours = date.getHours();
    let min = date.getMinutes();
    let ttime = hours + ":" + min;
    let img =req.body.img;
    let body = {
        chat:req.body.body,
        status:req.body.status,
        img:img,
        sender:req.body.user,
        ttime
    };
    console.log('1',req.body.img)
    let json1 ={user,from,to,body}; 
    let chatModel = new Chat(json1);
    Chat.findOne({$or:[{from:from,to:to},{from:to,to:from}]},function (err,doc) {
        if(err) console.log("err",err);
        if(doc){
            let resultFrom  = doc.from;
            let resultTo  = doc.to;
            Chat.updateOne({from:resultFrom,to:resultTo},{ $push: {body:body}},function(err){
                console.log('插入一条聊天记录');
            })
        }
        else{
            chatModel.save((err,chat)=>{
            let msg = {};
            if(err){
            msg['status'] = 'error';
            throw err;
            }
            msg['status'] = 'ok';
            msg['chat'] = chat;
            res.send({msg});
            });
        }
    });
});


router.get('/getchatlist/:user',(req,res) =>{//聊天列表
    var U=req.params.user;
    Chat.find({$or:[{from:U},{to:U}]},function(err,list){   
        let msg = {};
        if(err){
        msg['status'] = 'error';
        throw err;
        }
        msg['status'] = 'ok';
        msg['list'] = list;
        res.send({msg});
        console.log('聊天列表:'+ list);
    });
});



  router.get('/getchat/:to/:from',(req,res) => {//取聊天记录
    var toer=req.params.to;
    var fromer = req.params.from;
    Chat.find({$or:[{from:fromer,to:toer},{from:toer,to:fromer}]}).sort({"body.$.time":1}).exec(function(err,chats){

        
        if(chats.lenth > 0){
            let chat = chats[0];
            var B =[];
            for(var i = 0; i <chat.body.length;i++){
                if(chat.body[i].sender==toer){
                   chat.body[i].status=0;
                   B.push(chat.body[i]);
                }else{
                   B.push(chat.body[i]);
                }
            };
    
            Chat.update({$or:[{from:fromer,to:toer},{from:toer,to:fromer}]},{ $set : { body : B}}).exec(function(err,chats){
                console.log('1',chats)
            });
        }
        
        let msg = {};
        if(err){

            msg['status'] = 'error';
            throw err;
        }
        msg['status'] = 'ok';
        msg['chats'] = chats;
        res.send({msg});
   });
 });

 router.get('/getchat1/:to/:from',(req,res) => {//正在聊天时status=0
    var toer=req.params.to;
    var fromer = req.params.from;
    Chat.find({$or:[{from:fromer,to:toer},{from:toer,to:fromer}]}).sort({"body.$.time":1}).exec(function(err,chats){
        let chat = chats[0];
        var B =[];
        for(var i = 0; i <chat.body.length;i++){
            if(chat.body[i].sender==toer){
               chat.body[i].status=0;
               B.push(chat.body[i]);
            }else{
               B.push(chat.body[i]);
            }
        };

Chat.update({$or:[{from:fromer,to:toer},{from:toer,to:fromer}]},{ $set : { body : B}}).exec(function(err,chats){
    console.log('1',chats)
});
   });
 });

 
//更改状态
router.get('/getstatus/:id',(req,res) => {
    var id =req.params.id;
    Chat.update({_id:id},{selling:'false'},function(err,chats){
         let msg = {};
         if(err){
             msg['status'] = 'error';
             throw err;
         }
         msg['status'] = 'ok';
         msg['chats'] = chats;
         res.send({msg});
    });
 });

 module.exports = router;