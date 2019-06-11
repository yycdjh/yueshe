var express = require('express');
var router = express.Router();

let User = require('../server/users');



router.get("/", function(req, res, next) {
  User.find({},function(err,users){
    console.log(users);
});

})

router.post("/user_find", function(req, res, next) {
  console.log("user_find:"+req.body._id)
  let _id = req.body._id;
  User.find({_id:_id},function(err,response){

    res.send(response);
});

})

/* GET users listing. */
router.post('/up', function(req, res, next) {

  let user_name = req.body.user_name;
  let user = req.body.user;
  let psw = req.body.psw;
  let user_img = req.body.user_img;
  let money = req.body.money;
  let json = {user_name,user,psw,user_img,money};

      User.save(json,function(err){
        let response = {};
           if(err){
             response['status'] = 'error';
             console.log(err);
             throw err;
           }else{
            response['status'] = 'ok';
            res.send(response);
            
           }
    });

});

router.post('/login',function(req, res, next){
  let user = req.body.user;
  let psw = req.body.psw;

  User.find({user:user,psw:psw},function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        res.send(response);
      }
  })
})


router.post('/my',function(req, res, next){
  let _id = req.body._id
    //  console.log(_id)
  User.findById({_id:_id},function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        res.send(response);
      }
  })
})

router.post('/zhuye_user',function(req, res, next){
  let user_id = req.body.user_id
    //  console.log(_id)
  User.findById({_id:user_id},function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        res.send(response);
      }
  })
})

router.post('/chat_user',function(req, res, next){
  let user_name = req.body.user_name
    //  console.log(_id)
  User.find({user_name:user_name},function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        res.send(response);
      }
  })
})

router.post('/update',function(req, res, next){
  let _id = req.body._id;
  let user_name = req.body.user_name;
  let introduction = req.body.introduction;
  let sex = req.body.sex;
  let like = req.body.like;
  let old = req.body.old;

  let json = {user_name,introduction,sex,like,old};
     console.log(_id)

  User.update({_id:_id},json,function(err){
      if(err){
     console.log("err"+err)
      }
   else{
    User.findById({_id:_id},function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        res.send(response);
      }
  })
      }
  })
})
module.exports = router;
