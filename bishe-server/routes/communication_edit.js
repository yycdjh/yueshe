var express = require('express');
var router = express.Router();

let Communication = require('../server/communication');

router.get("/", function(req, res, next) {
    res.render('communication_edit')
  })
  
  router.get("/:communication_id", function(req, res, next) {
     let communication_id = req.params.communication_id;
     Communication.findById({_id:communication_id},function(err,communication){
 
        res.render('communication_edit',{communication});
      
    })

  
  })

  router.post('/update',function(req,res,next){
    console.log(req.body);

    let communication_id = req.body.communication_id;
    let communication_name = req.body.communication_name;
    let author = req.body.author;
    let author_img = req.body.author_img;
    let communication_img = req.body.communication_img;
    let summary = req.body.summary;
    let classification = req.body.classification;
    let time =  req.body.time;
    let pass =  req.body.pass;
    let json = {communication_name,author,author_img,communication_img,summary,classification,time,pass};
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