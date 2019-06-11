<template>
<div class="center">
    <mt-header fixed>
        <mt-button icon="back" slot="left" v-on:click="tomy()"></mt-button>
        
    </mt-header>

    <div class="cpage">
    <div class="btouxiang">
        <div>
            <img :src="user.user_img" width="100" height="100">
        </div>
    </div>

    <div>

      <div class="bianji">
      <span class="bname">{{user.user_name}}   {{user.sex}}</span>
      <span class="bcibi">{{user.old}}   {{user.like}}</span>
      <mt-button class="mbtn" type="primary" v-on:click="pick()">PICK</mt-button>
      <mt-button class="mbtn" type="primary" v-on:click="chat(user.user_name)">CHAT</mt-button>
      </div>
      
    
      </div>
      
      <div style="height:20px;background: rgb(241, 241, 241);"></div>
      <div class="jieshao">
        
      <div v-if="imgs.length ==0" style="text-align: center;font-sise:20px;margin-top:15px;">暂无作品</div>
        <el-card class="box-card" v-for="(img,index) in imgs" :key="index"><!--第一个卡片 -->
        <div>
            
            <div class="biaoti"><img :src="img.user_img" style="width:30px;height:30px" alt="">{{img.user_name}}</div>
            <div class="comtents">
                <img :src="img.img_url" style=" height: auto;width: 60%;margin-top:15px;"/>
            </div>
            <div class="bottom clearfix">
                <time class="time">{{ img.time }}</time>
                </div>   
        </div>
        </el-card>
      </div>

    </div>

</div>
</template>

<script>

  export default {
  name: 'app',
  data () {
    return {
        currentDate: new Date().toLocaleString(),
        user:[],
        imgs:[],
        task:[],
        id:'',
    }
  },

  methods:{
    tomy(){
       this.$router.go(-1)
    },
    chat(user_name){
       this.$router.push('/chat/'+user_name);
    },
    towenzhang(){
      this.$router.push('/wenzhang');
    },
    pick(){
       var _this = this;
       var task_id = _this.$route.params.task_id;
       var user_id = _this.$route.params.user_id;
       var _id = _this.$store.state.id;
       if(!this.id){
                alert("请先登录")
             }else if(user_id == this.task.author_id){
                alert("不能PICK任务给自己")
             }else if(this.id == this.task.author_id && user_id != this.task.author_id){
            _this.$http
            .post(_this.baseUrl+"/task_list/pick",{task_id:task_id,_id:user_id},{emulateJSON: true})
            .then(
              (response)=>{
                  console.log(response);
                  if(response.body.status == "exist"){
                    this.$Message.warning('已存在PICK人选');
                  }else if(response.body.status == "ok"){
                    this.$Message.success('PICK成功');
                  }
              },
              (error)=>{
            
              }
            );
             }
             else{
                alert("不是发起人")
             }
   }

  },
    mounted: function() {
             var _this = this;
             var task_id = _this.$route.params.task_id;
             var user_id = _this.$route.params.user_id;
             _this.id = _this.$store.state.id;
            //  console.log("task_id:"+task_id);
            //  console.log("user_id:"+user_id);
     

         _this.$http.post(_this.baseUrl+"/users/zhuye_user",{user_id:user_id},{emulateJSON: true})
            .then(
              (response)=>{
                      // console.log(response.data)
                      _this.user = response.data;
                      //  console.log(_this.user)
              },
              (error)=>{
            
              }
            );

         _this.$http.post(_this.baseUrl+"/task_list/findOne",{_id:task_id},{emulateJSON: true})
            .then(
              (response)=>{
                      // console.log(response.data)
                      _this.task = response.data;
                      //  console.log(_this.task)       
              },
              (error)=>{
            
              }
            );

         _this.$http.post(_this.baseUrl+"/img/find",{user_id:user_id},{emulateJSON: true})
            .then(
              (response)=>{
                      _this.imgs = response.data;
                      //  console.log(_this.imgs)
                      
              },
              (error)=>{
            
              }
            );
              }
}
</script>

<style>
.center{
  margin-top: 50px;
}
.center .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
.cpage .mint-cell{
  border-bottom: 1px solid rgb(238, 238, 238);
}
.btouxiang{
  position: relative;
  height: 160px;
  background: url("/static/img/my/pback.jpg");
  background-size: 100% 100%;
}
.btouxiang div{
  position: absolute;
  width: 100px; 
  height: 100px; 
  border-radius: 50%; 
  overflow: hidden;
  margin: auto;       
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; 
}

.bianji{
  position: relative;
  height: 60px;
  margin-top: 0px;
  background: white;
  border-bottom: 1px solid rgb(238, 238, 238);
}
.bname{
  position: absolute;
  margin-top: 10px;
  margin-left: 15px;
  white-space: pre;
  font-weight: bold;
  font-size: 20px;
}

.bcibi{
  position: absolute;
  margin-top: 38px;
  margin-left: 15px;
  font-size: 10px;
  white-space: pre;
}
.mbtn{
  width:100px;
  height:25px;
  margin-top: 20px;
  margin-right: 10px;
  float:right;
  font-size:12px;

}
.myguan{
  height: 80px;
  position: relative;
  background: white;
}
.guan{
  position: absolute;
  margin-top: 20px;
  left: 22%;
}
.xian{
  position: absolute;
  width: 1px;
  height: 40px;
  background: black;
  left: 50%;
  margin-top: 20px;
}
.bei{
  position: absolute;
  margin-top: 20px;
  right: 22%;
}
.jieshao{
  background: white;
}
.jieshao span{
  display:block;
  word-break: break-all;
  word-wrap: break-word;
  
}
.quxiao{
  margin-top: 15px;
  margin-left: 30px;
  float: left;
  width: 35%;
  height: 30px;
  font-size: 13px;
  border:1px solid rgb(0, 0, 0);
}
.queding{
  margin: 15px auto 0;
  margin-right: 30px;
  float: right;
  width: 35%;
  height: 30px;
  font-size: 13px;
}
  .img{
    height: auto;
    width: 30%;
    float: right;
    
  }
   .biaoti{
    font-size: 15px;
    font-weight:bold;
  }
  .comtents{
   
    font-size: 12px;
    margin-top: 4px;
    text-overflow: -o-ellipsis-lastline;   
    overflow: hidden;   
    text-overflow: ellipsis;   
    display: -webkit-box;   
    -webkit-line-clamp: 2;    
    -webkit-box-orient: vertical;  
  }
     .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 40px;
    line-height: 12px;
  }
</style>


