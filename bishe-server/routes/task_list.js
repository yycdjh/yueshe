var express = require('express');
var router = express.Router();

let Task = require('../server/task');
let User = require('../server/users');

router.get("/", function(req, res, next) {
    Task.find({},function(err,tasks){
    res.render('task_list',{tasks});
  });

})

router.post('/all',function(req,res,next){
    Task.find({state:0},function(err,response){
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
   let user = [];

   Task.findById({_id:_id},function(err,response){
    if(err){
      console.log("err"+err)
       }
    else{
        //  console.log("response:"+response);
         res.send(response);
       }
});
});

router.post('/pick',function(req,res,next){
  let _id = req.body.task_id;
  let pick_userid = req.body._id;
  let state = 1;
  let json = {pick_userid,state}
  Task.find({_id:_id},function(err,response){
    let result = {};
    if(err){
      console.log("err"+err)
       }
    else{
      if(response[0].pick_userid){
        result['status'] = 'exist';
        result['response'] = response;
        res.send(result);
      }else{
        Task.update({_id:_id},json,function(err,response){
          if(err){
            console.log("err"+err)
              }
          else{
              result['status'] = 'ok';
              result['response'] = response;
              res.send(result);
              }
        });
    }
       }
 });

});

router.post('/up_task',function(req,res,next){
  let author_id = req.body.author_id;

  Task.find({author_id:author_id},function(err,response){
   if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        res.send(response);
      }
});
});

router.post('/down_task',function(req,res,next){

  let pick_userid = req.body.author_id;

  Task.find({pick_userid:pick_userid},function(err,response){
   if(err){
     console.log("err"+err)
      }
   else{
        console.log(response)
        res.send(response);
      }
});
});

router.post('/state1',function(req,res,next){
  
    let _id = req.body._id;
    let state = 2;
    let json = {
      state
    }
    Task.update({_id:_id},json,function(err,response){
      if(err){
        console.log("err"+err)
         }
      else{
           console.log(response)
           res.send(response);
         }
   });
  });
  
  router.post('/state2',function(req,res,next){
    
      let _id = req.body._id;
      let state = 3;
      let user = {};
      let json = {
        state
      }
      Task.findById({_id:_id},function(err,response){
        if(err){
          console.log("err"+err)
           }
        else{
          
      User.update({_id:response.author_id},{$inc:{money:response.money}},function(err,response){
            if(err){
              console.log("err"+err)
               }
            else{
                 console.log("state2:"+response)
               }
         });

           }
      });
      Task.update({_id:_id},json,function(err,response){
        if(err){
          console.log("err"+err)
           }
        else{
             console.log(response)
             res.send(response);
           }
     });
    });

router.post('/finduser_bidding',function(req,res,next){
  let user_id = req.body.user_id;
  let _id = req.body._id;
  Task.find({_id:_id,"bidding_user_arr.user_id":user_id},function(err,response){
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
    Task.remove({_id: req.body.taskId },function(err){
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

router.post('/addbidding',function(req,res,next){
  // console.log(req.body);
  let  _id = req.body._id;
  let  user_id = req.body.user_id;
  let  user_name = req.body.user_name;
  let  user_img = req.body.user_img;
  let  time = req.body.time;

    let bidding_user_arr =[{
      user_id,    
      user_name,
      user_img,
      time,
  }
 ];

 let json = {bidding_user_arr};
 
  console.log(json);
  //json,回调
  Task.update({_id:_id},{"$push":{
    bidding_user_arr:{
        user_id:user_id,
        user_name:user_name,
        user_img:user_img,
        time:time,
    
    },$inc:{bidding_sum:1}
  }},function(err,response){
     
          if(err){
              console.log("err"+err)
               }
            else{
                 console.log(response)
                 res.send(response);
             }
  });
});

router.post('/task_content',function(req,res,next){
  // console.log(req.body);
  let  task_id = req.body.task_id;
  let  user_name = req.body.user_name;
  let  user_img = req.body.user_img;
  let  time = req.body.time;
  let  comment = req.body.comment;
  let comments =[{
         user_name,
         user_img,
         time,
         comment,
     }
    ];
 let json = {comments};
  //json,回调
  Task.update({_id:task_id},{'$push':{
      comments:{
          user_name:user_name,
          user_img:user_img,
          time:time,
          comment:comment,
      }
  }},function(err,response){
     
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
