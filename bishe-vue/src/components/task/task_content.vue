<template>
  <div class="htneirong" >
  <mt-header fixed>
      <mt-button icon="back" slot="left" v-on:click="backtoup2()"></mt-button>
    </mt-header>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
    <span class="nryonghu" @click="tozhuye()">
      <div class="nrkuang">
      <img :src="task.author_img" width="30" height="30" />
      </div>
      <span class="nrmingzi">{{task.author}}</span>
    </span>
   
    <el-button size="mini" class="htbuttons" v-if="exist.length ==0 " v-on:click="taskup()">竞标</el-button> 
    <el-button size="mini" class="htbuttons is-disabled" v-if="exist.length != 0" disabled:true >已竞标</el-button> 
  </div>
  <div class="text item">
    <div class="fxbiaoti" >{{task.task_name}}  <span style="float: right; color:black">竞标人数：{{bidding_user_arr.length}}</span></div>
    <div class="fxneirong" v-bind:class="{'nclass-a':nisA,'nclass-b':nisB}" @click="shoukai()">{{task.summary}}</div>
    <div  v-show="ashow" class="adown"><i class="el-icon-arrow-down"></i></div>
    <div v-show="!ashow" class="adown"><i class="el-icon-arrow-up"></i></div>
  </div>
</el-card>
  <div>
  <mt-navbar  style="margin-top:-15px;"  class="anav" v-model="selected">
  <mt-tab-item id="1">内容</mt-tab-item>
  <mt-tab-item id="2" v-if="task.author_id == this.id">竞标者</mt-tab-item>
  </mt-navbar>
  </div>
    <div id="index_type" class="page-tab-container">
    <mt-tab-container class="page-tabbar-tab-container" v-model="selected" >
      <mt-tab-container-item id="1">
        <div class="hw">
          <div class="huida">{{comments.length}}个回复</div>
          <div class="nrwrite" @click="towrite()">写评论</div>
        </div>
        <div v-show="!pshow" style="padding-bottom:30px;">
          <mt-field placeholder="说说你看过之后的感受吧..." type="textarea" rows="5" v-model="dsc"></mt-field>
          <mt-button type="primary" size="small" @click="topush()" class="wfabu">发布</mt-button>
        </div>
        <el-card class="box-card"  v-for="(comment,index) in comments" :key="index">   <!--第yi个卡片 -->
          <div class="text item">
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
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div v-if="bidding_user_arr.length ==0" style="text-align: center;font-sise:20px;margin-top:15px;">暂无人竞标</div>
        <div style="margin-top:36px;"></div>
        <div  v-for="(bidding,index) in bidding_user_arr" :key="index" v-on:click="tozhuye(bidding.user_id,task._id)">
          <mt-cell :title="bidding.user_name" is-link>
          <span>信息</span>
          <img :src="bidding.user_img" slot="icon" width="24" height="24">
          </mt-cell>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>




    </div>

   

</template>

<script>
export default {
  data(){
      return{
        selected:'1',
        nisA:false,
        nisB:true,
        ashow:true,
        pshow:true,
        task:[],
        comments:[],
        bidding_user_arr:[],
        dsc:'',
        exist:'',
        id:'',
        
      }

  },
  methods:{
    tozhuye(user_id,task_id){
      this.$router.push('/zhuye/'+user_id+'&'+task_id);
    },

    backtoup2(){
      this.$router.go(-1)
    },
    taskup(){
      if(!this.id){
        this.$Message.warning('请先登录');

      }else if(this.id==this.task.author_id){
        this.$Message.warning('不能竞标自己发布的任务');
      }else{
      var _this = this;
      var _id = _this.$route.params.task_id
      var user_name = _this.$store.state.user_name;
      var user_img = _this.$store.state.user_img;
      var user_id = _this.$store.state.id;
      _this.currentDate =  new Date().toLocaleString();
      var time = _this.currentDate
    //  console.log(user_id);
      _this.$http
      .post(_this.baseUrl+"/task_list/addbidding",{_id:_id,user_name:user_name,user_img:user_img,user_id:user_id,time:time},{emulateJSON: true})
      .then(
      (response)=>{
        if(response.data.ok==1){
          var _this = this;
          var _id = _this.$route.params.task_id    
          _this.$http
          .post(_this.baseUrl+"/task_list/findOne",{_id:_id},{emulateJSON: true})
          .then(
            (response)=>{
                _this.task = response.data;
                _this.bidding_user_arr = response.data.bidding_user_arr.reverse(); 
              },
            (error)=>{
              }
          );
        _this.$http
        .post(_this.baseUrl+"/task_list/finduser_bidding",{_id:_id,user_id:user_id},{emulateJSON: true})
        .then(
        (response)=>{
          _this.exist = response.data;    
          },
        (error)=>{
          }
        );
          }    
      },
      (error)=>{
      }
    );
      }
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
      var task_id = _this.$route.params.task_id
      var user_name = _this.$store.state.user_name;
      var user_img = _this.$store.state.user_img;
      var comment = _this.dsc;
      _this.currentDate =  new Date().toLocaleString();
      var time = _this.currentDate
      _this.$http.post(_this.baseUrl+"/task_list/task_content",{task_id:task_id,user_name:user_name,user_img:user_img,comment:comment,time:time},{emulateJSON: true})
      .then(
      (response)=>{
        if(response.data.ok==1){
          var _this = this;
          var _id = _this.$route.params.task_id    
          _this.$http.post(_this.baseUrl+"/task_list/findOne",{_id:_id},{emulateJSON: true})
          .then(
          (response)=>{
            _this.task = response.data;
            _this.comments = response.data.comments.reverse()  
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
    var _id = _this.$route.params.task_id;
    var user_id = _this.$store.state.id;
    _this.id = _this.$store.state.id;
    // console.log(_this.id);
  //  console.log(_id);

    _this.$http
    .post(_this.baseUrl+"/task_list/findOne",{_id:_id},{emulateJSON: true})
    .then(
      (response)=>{
                _this.task = response.data;
                _this.comments = response.data.comments.reverse()
              _this.bidding_user_arr = response.data.bidding_user_arr.reverse()        
      },
      (error)=>{

      }
    );
    _this.$http
    .post(_this.baseUrl+"/task_list/finduser_bidding",{_id:_id,user_id:user_id},{emulateJSON: true})
    .then(
      (response)=>{
                _this.exist = response.data;             
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