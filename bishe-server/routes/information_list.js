var express = require('express');
var router = express.Router();

let Information = require('../server/information');

router.get("/", function(req, res, next) {
    Information.find({pass:'true'},function(err,informations){
    res.render('information_list',{informations});
  });

})

router.get('/all',function(req,res,next){
    Information.find({pass:'true'},function(err,response){
      if(err){
        console.log("err"+err)
         }
      else{
           console.log(response)
           res.send(response);
         }
  });
});

router.post('/information_find',function(req,res,next){
  let information_id = req.body._id;
  console.log(information_id);
  Information.find({_id:information_id},function(err,response){
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
    Information.remove({_id: req.body.communicationId },function(err){
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
