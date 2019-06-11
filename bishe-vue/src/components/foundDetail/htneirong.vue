<template>
  <div class="htneirong" >
  <mt-header fixed>
      <mt-button icon="back" slot="left" v-on:click="backtoup2()"></mt-button>
    </mt-header>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
    <span class="nryonghu" @click="tozhuye()">
      <div class="nrkuang">
      <img :src="communication.author_img" width="30" height="30" />
      </div>
      <span class="nrmingzi">{{communication.author}}</span>
    </span>
    <el-button size="mini" class="htbuttons">关注</el-button> 
    
  </div>
  <div class="text item">
    <div class="fxbiaoti" >{{communication.communication_name}}</div>
    <img :src="communication.communication_img" width="100%" height="200" />
    <div class="fxneirong" v-bind:class="{'nclass-a':nisA,'nclass-b':nisB}" @click="shoukai()">{{communication.summary}}</div>
    <div  v-show="ashow" class="adown"><i class="el-icon-arrow-down"></i></div>
    <div v-show="!ashow" class="adown"><i class="el-icon-arrow-up"></i></div>
  </div>
</el-card>
<div class="hw">
<div class="huida">205个回答</div>
<div class="nrwrite" @click="towrite()">写回答</div>
</div>
  <div v-show="!pshow" style="padding-bottom:30px;">
        <mt-field placeholder="说说你看过之后的感受吧..." type="textarea" rows="5" v-model="dsc"></mt-field>
        <mt-button type="primary" size="small" @click="topush()" class="wfabu">发布</mt-button>
  </div>
  <el-card class="box-card"  v-for="(comment,index) in comments" :key="index">   <!--第yi个卡片 -->
        <div class="text item" @click="toplneirong(communication._id,comment._id)">
         
          <div class="htyonghu">
            <div class="htkuang">
            <img  :src="comment.user_img" width="15" height="15">
            </div>
            <div class="htname">{{comment.user_name}}</div>
          </div>

        <br>
          <div class="htcomtents">
             <span class="hhcomtents"> 
                 {{comment.comment}}
              </span>
          </div>
          



        </div>
      </el-card>
     



    </div>

   

</template>

<script>
export default {
  data(){
      return{
        nisA:false,
        nisB:true,
        ashow:true,
        pshow:true,
        communication:[],
        comments:[],
        dsc:'',
        
      }

  },
  methods:{
    tozhuye(){
        this.$router.push('/zhuye');
    },
    toplneirong(communication_id,comment_id){
      this.$router.push('/plneirong/'+communication_id+'/'+comment_id);
    },
    backtoup2(){
               this.$router.go(-1)
           },
    shoukai(){
      if(this.ashow){
          this.ashow=false,
          this.nisA=true,
          this.nisB=false

      }else{
        this.ashow=true,
          this.nisA=false,
          this.nisB=true
      }
        },
    towrite(){
      if(this.pshow){  
                    this.pshow = false;  
                }else{  
                    this.pshow = true;  
                } 
        },
        topush(){
             var _this = this;
             var communication_id = _this.$route.params.communication_id
             var user_name = _this.$store.state.user_name;
             var user_img = _this.$store.state.user_img;
             var comment = _this.dsc;
             _this.currentDate =  new Date().toLocaleString();
             var time = _this.currentDate
            _this.$http.post("http://localhost:3000/comment_list/addcomment",{communication_id:communication_id,user_name:user_name,user_img:user_img,comment:comment,time:time},{emulateJSON: true})
            .then(
              (response)=>{
                      //  console.log(response.data.ok)
                      // console.log(_this.user)
                      
                    if(response.data.ok==1){
                     var _this = this;
             var _id = _this.$route.params.communication_id    
            _this.$http.post("http://localhost:3000/communication_list/findOne",{_id:_id},{emulateJSON: true})
            .then(
              (response)=>{
                      //  console.log(response.data)
                        _this.communication = response.data;
                        _this.comments = response.data.comments.reverse()
                        // console.log(_this.comments)
                      // console.log(_this.user)
                      
              },
              (error)=>{
            
              }
            );
                    }
              },
              (error)=>{
            
              }
            );

            this.pshow = true; 
} 
  },
  mounted: function() {
             var _this = this;
             var _id = _this.$route.params.communication_id;
            //  console.log(_id);
     
            _this.$http.post("http://localhost:3000/communication_list/findOne",{_id:_id},{emulateJSON: true})
            .then(
              (response)=>{
                      // console.log(response.data)
                        _this.communication = response.data;
                        _this.comments = response.data.comments.reverse()
                        // console.log(_this.comments)
                      // console.log(_this.user)
                      
              },
              (error)=>{
            
              }
            );
              }

}
</script>

<style>
.htneirong{
  margin-top: 40px;
}
.htneirong .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.fxneirong{
  color: gray;
  font-size: 12px;
  margin-top: 15px;
}
.nclass-b{

    text-overflow: -o-ellipsis-lastline;   
    overflow: hidden;   
    text-overflow: ellipsis;   
    display: -webkit-box;   
    -webkit-line-clamp: 2;    
    -webkit-box-orient: vertical;  

}
.adown{
  text-align: center;
  margin-top: 10px;
  margin-bottom: -40px;
}
.fxbiaoti{
  font-size: 15px;
  font-weight: bold;
}
  .htbuttons{
      background-color: #8b98ee;
      color:white;
      float: right;
      
      
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .box-card {
    
    padding: 10px;

  }
  .htyonghu{
    float: left;
    font-size: 15px;
  }
  .htkuang{
  width: 15px; 
  height: 15px; 
  border-radius: 50%; 
  border: 2px solid #eee; 
  overflow: hidden;
  float: left;
  margin-right: 5px;
}
  .htname{
    float: left;
    font-size: 10px;
    color: gray;
    margin-top: 6px
  }
 
  
  .htcomtents{
    font-size: 12px;
    margin-top: 4px;
  }
    .hhcomtents{
    text-overflow: -o-ellipsis-lastline;   
    overflow: hidden;   
    text-overflow: ellipsis;   
    display: -webkit-box;   
    -webkit-line-clamp: 4;    
    -webkit-box-orient: vertical; 
  }

  .htzan{
    color: gray;
    font-size: 7px;
    margin-top: 20px;
    float: left;
  }
  .htpinglun{
      margin-left: 10px;
       color: gray;
    font-size: 7px;
    margin-top: 20px;
    float: left;
  }
  .hw{
     
      width: 100%;
      height: 30px;
      font-size: 8px;
      color: gray
  }
  .huida{
      float: left;
      margin-top: 8px;
      margin-left: 28px;
    

  }
  .nrwrite{
      float: right;
      margin-right: 28px;
      margin-top: 8px;
      color: #8b98ee

  }
.wfabu{
  float:right;
  font-size:10px;
  width:60px;
  height:25px;
}
.nrkuang{
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
  border: 2px solid #eee; 
  overflow: hidden;
  float: left;
  margin-right: 5px;
}
  .nryonghu{
    float: left;
    font-size: 15px;
  }
   .nrmingzi{
   float: right;
   margin-left: 10px;
   margin-top: 5px;
 }
</style>