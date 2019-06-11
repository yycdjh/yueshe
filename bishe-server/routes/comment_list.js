var express = require('express');
var router = express.Router();

let Communication = require('../server/communication');

router.get("/", function(req, res, next) {
 
     res.render('comment_list',{
         communications:{
             comments:{
                 user_name:'',
                 user_img:'',
                 time:"",
                 comment:'',
                 zan:'',
             }
         }
    });


 });


 router.post("/findOne", function(req, res, next) {
    let communication_id = req.body.communication_id;
    let comment_id = req.body.comment_id;
    Communication.findById({_id:communication_id},function(err,communications){
        if(err){
            console.log("err"+err)
        
             }
          else{
               console.log(communications)
               console.log(communications.comments.length)
               res.send(communications);
        
             }
    
   });
})

 router.post('/delcomment',function(req,res,next){
    
    let _id = req.body.commentId
    let communication_id = req.body.communication_id
    console.log(_id)
    console.log(communication_id)
    Communication.update( {_id:communication_id},{"$pull":
    {
           comments:{
               _id:_id
           }
    }},function(err){
    
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

router.get("/:communication_id", function(req, res, next) {
    let communication_id = req.params.communication_id;
    Communication.findById({_id:communication_id},function(err,communications){
        if(err){
            console.log("err"+err)
        
             }
          else{
               console.log(communications)
               console.log(communications.comments.length)
              
               res.render('comment_list',{
                   communications,
                   comments:communications.comments
                });
             }
    
   });
})
// router.post('/findOne',function(req,res,next){
//    let _id = req.body._id;

//   Communication.findById({_id:_id},function(err,response){
//     if(err){
//       console.log("err"+err)
//        }
//     else{
//          console.log(response)
//          res.send(response);
//        }
// });
// });

router.post('/addcontent',function(req,res,next){
    // console.log(req.body);
    let  communication_id = req.body.communication_id;
    let  comment_id  =  req.body.comment_id;
    let  user_name = req.body.user_name;
    let  user_img = req.body.user_img;
    let  time = req.body.time;
    let  comment = req.body.comment;
    let  zan = 0;
     

      let contents =[{
        user_name,
        user_img,
        time,
        comment,
        zan,
    }
   ];
      console.log(communication_id)
      console.log(comment_id)
   let json = {contents};
   
    console.log(json);
    //json,回调
    Communication.update({_id:communication_id,'comments._id':comment_id},{"$push":{
        "comments.$.contents":{
            user_name,
            user_img,
            time,
            comment,
            zan,
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




router.post('/addcomment',function(req,res,next){
    // console.log(req.body);
    let  communication_id = req.body.communication_id;
    let  user_name = req.body.user_name;
    let  user_img = req.body.user_img;
    let  time = req.body.time;
    let  comment = req.body.comment;
    let  zan = 0;
     let comments =[{
           user_name,
           user_img,
           time,
           comment,
           zan,
       }
      ];
   console.log(comments);
   let json = {comments};
    console.log(communication_id);
    console.log(json);
    //json,回调
    Communication.update({_id:communication_id},{'$push':{
        comments:{
            user_name:user_name,
            user_img:user_img,
            time:time,
            comment:comment,
            zan:zan,  
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
