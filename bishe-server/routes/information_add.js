var express = require('express');
var router = express.Router();

let Information = require('../server/information');

router.get("/", function(req, res, next) {
    res.render('information_add',{
       information:{
       information_title:"",
       information_author:'',
       information_contents:"",
       information_img:"",
       pass:"",
      }
    });
  })

  
 router.post('/add',function(req,res,next){
    let information_title = req.body.information_title;
    let information_author = req.body.information_author;
    let information_contents = req.body.information_contents;
    let information_img = req.body.information_img;
    let time = req.body.time
    let pass = req.body.pass
    let json = {
      information_title,
      information_author,
      information_contents,
      information_img,
      time,
      pass
    };
    //json,回调

    Information.save(json,function(err,response){
      if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        Information.find({pass:'true'},function(err,informations){
          res.render('Information_list',{informations});
        });
        // res.send(response);
      }
  })
  });
  





  module.exports = router;