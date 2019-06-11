var express = require('express');
var router = express.Router();

let Communication = require('../server/communication');

router.get("/", function(req, res, next) {
   Communication.find({pass:'true'},function(err,communications){
    res.render('communication_list',{communications});
  });

})

router.post('/all',function(req,res,next){
    Communication.find({pass:'true'},function(err,response){
      if(err){
        console.log("err"+err)
         }
      else{
           console.log(response)
           res.send(response);
         }
  });
});

router.post('/findcommunication',function(req,res,next){
  let communication_name = req.body.communication_name
  let reg = new RegExp(communication_name,'i')
  Communication.find({
  communication_name: {$regex : reg},
  pass: true
  }, function(err, response) {
  if(err){
  console.log("err"+err)
  res.send({ 
  success: false,
  message: '查询失败'
  })
  }
  else{
  console.log(response)
  res.send({
  success: true,
  message: '查询成功',
  resultList: response
  })
  }
  });
  });

router.post('/user_all',function(req,res,next){
  let author_id = req.body.author_id;
  Communication.find({pass:'true',author_id:author_id},function(err,response){
    if(err){
      console.log("err"+err)
       }
    else{
         console.log(response)
         res.send(response);
       }
});
});

router.post('/findOne',function(req,res,next){
   let _id = req.body._id;

  Communication.findById({_id:_id},function(err,response){
    if(err){
      console.log("err"+err)
       }
    else{
         console.log(response)
         res.send(response);
       }
});
});

router.post('/del',function(req,res,next){
Communication.remove({_id: req.body.communicationId },function(err){
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
