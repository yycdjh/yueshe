var express = require('express');
var router = express.Router();

let Communication = require('../server/communication');

router.get("/", function(req, res, next) {
    res.render('communication_add',{
        communication:{
       communication_name:"",
       communication_img:'',
       author:"",
       author_img:"",
       summary:"",
       classification:"",
       pass:"",
      }
    });
  })

  
 router.post('/add',function(req,res,next){
    let communication_name = req.body.communication_name;
    let author = req.body.author;
    let author_id = req.body.author_id;
    let author_img = req.body.author_img;
    let summary = req.body.summary;
    let classification = req.body.classification;
    let communication_img = req.body.communication_img;
    let time = req.body.time
    let pass = req.body.pass
    let json = {author_id,communication_name,author,author_img,summary,classification,communication_img,time,pass};
    //json,回调

    Communication.save(json,function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        Communication.find({pass:'true'},function(err,communications){
          res.render('communication_list',{communications});
        });
        // res.send(response);
      }
  })
  });
  





  module.exports = router;