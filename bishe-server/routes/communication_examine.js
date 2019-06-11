var express = require('express');
var router = express.Router();

let Communication = require('../server/communication');

router.get("/", function(req, res, next) {
   Communication.find({pass:'false'},function(err,communications){
    res.render('communication_examine',{communications});
  });

})


router.post('/pass',function(req,res,next){
  console.log(req.body);

  let communication_id = req.body.communicationId;

  let pass =  "true";
  let json = {pass};
  console.log(communication_id);
  console.log(json);
  //json,回调
  Communication.update({_id:communication_id},json,function(err){
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
