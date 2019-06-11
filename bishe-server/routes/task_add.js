var express = require('express');
var router = express.Router();

let Task = require('../server/task');

router.get("/", function(req, res, next) {
    res.render('task_add',{
        task:{
       task_name:"",
       author:"",
       author_img:"",
       money:"",
       summary:"",
       classification:"",
       pass:"",
      }
    });
  })

  router.post('/add',function(req,res,next){
    let task_name = req.body.task_name;
    let author = req.body.author;
    let author_id = req.body.author_id;
    let author_img = req.body.author_img;
    let state = req.body.state;
    let summary = req.body.summary;
    let money = req.body.money;
    let bidding_sum = 0;
    
    let classification = req.body.classification;
    let time = req.body.time
    let pass = req.body.pass
  
    let json = {state,author_id,task_name,author,author_img,summary,classification,time,pass,money,bidding_sum};
    //json,回调

    Task.save(json,function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        Task.find({},function(err,tasks){
            res.render('task_list',{tasks});
          });
      }
  })
  });

module.exports = router;