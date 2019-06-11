var express = require('express');
var router = express.Router();
let Img = require('../server/img');


router.post('/add',function(req,res,next){


    let img_url = req.body.img_url;
    let time = req.body.time;
    let user_img = req.body.user_img;
    let user_id = req.body.user_id;
    let user = req.body.user;
    let user_name = req.body.user_name;
    let img_name = req.body.img_name;

    let json = {img_url,time,user_img,user_id,user,user_name};
    //json,回调

    Img.save(json,function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        res.send(response);

        // res.send(response);
      }
  })
  });

  router.post('/find',function(req,res,next){
    let user_id = req.body.user_id;
 

        Img.find({user_id:user_id},function(err,response){
     if(err){
       console.log("err"+err)
        }
     else{
          console.log(response)
          res.send(response);
        }
 });
 });

module.exports = router;
