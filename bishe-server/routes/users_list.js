var express = require('express');
var router = express.Router();

let User = require('../server/users');

router.get("/", function(req, res, next) {
    User.find({},function(err,users){
    res.render('users_list',{users});
  });

})

router.get('/all',function(req,res,next){
    User.find({},function(err,users){
    res.render('users_list',{users});
  });
});



router.post('/del',function(req,res,next){
  User.remove({_id: req.body.usersId },function(err){
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
module.exports = router;
