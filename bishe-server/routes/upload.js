var express = require('express');
var router = express.Router();
var multer  = require('multer');
var process = require("process");

var User = require('../server/users');

let uploadPath = process.cwd() + "/public/images/upload";
console.log("uploadPath", uploadPath);
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
     destination: function (req, file, cb) {
         cb(null, uploadPath)
    }, 
  //给上传文件重命名，获取添加后缀名
   filename: function (req, file, cb) {
       var fileFormat = (file.originalname).split(".");
       cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
   
      }
});  
//添加配置文件到muler对象。
var upload = multer({
       storage: storage
 });

router.post('/upload',upload.any(), function(req, res, next) {

  console.log(req.files);
  res.send( req.files)
  });
 
 
  router.post('/touxiang',upload.any(), function(req, res, next) {
    let _id = req.body.user_id
    let user_img = "http://localhost:3000/images/upload/" + req.files[0].filename;
    let json = {user_img}
    console.log(user_img)
    User.update({_id:_id},json,function(err){
      let response = {};
      if(err){
        response['status'] = 'error';
        console.log(err);
        throw err;
      }else{
       User.findById({_id:_id},function(err,user){
        res.send(user);
       })
       
       
      }
   });
    
    });
   
   


module.exports = router;