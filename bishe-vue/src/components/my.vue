<template>
  <div class="my">
  <mt-header :style="{'bakcground':'background:rgba(27, 190, 231,' + opacityNum + ')'}">
     
      <h1 slot="left">我的</h1>
      <!-- <mt-button icon="search" slot="right" @click="tosearch()"></mt-button> -->
      <mt-button slot="right"  style="margin-left:20px;" @click="tonews()">
        <img src="/static/img/icon/news.png" width="16" height="16" slot="icon">
      </mt-button>
      <mt-button slot="right"  style="margin-left:20px;" @click="toset()">
        <img src="/static/img/icon/设置.png" width="16" height="16" slot="icon">
      </mt-button>
  </mt-header>
  <div class="personal-card">
    <div class="wode">
    <mt-cell v-show="show1" style="height:100px;">
      <div class="mkuang" slot="icon">
        <img  src="/static/img/touxiang/0.jpg" width="80" height="80">
      </div>
        <mt-button class="dengzhu"  type="primary" @click="tologin()">登录 / 注册</mt-button>
    </mt-cell>
    <div v-show="show2" @click="tocenter()" class="ziliao">
      <div class="mmkuang">
      <img :src="user.user_img" width="80" height="80">
      </div>
      <span class="myname">{{user.user_name}}</span>
      <!-- <span class="myid">ID:{{user.user}}</span> -->
      <span class="mymoney">余额: {{user.money}}</span>
      <span class="myziliao">个人主页 ></span>
    </div>
    </div>
    <div class="content-two">
    <Row class="interact-number">
        <Col span="8"><img  src="/static/img/icon/充值.png" width="40" height="40"></Col>
        <Col span="8"><img  src="/static/img/icon/消息.png" width="40" height="40" @click="tochat_list()"></Col>
        <Col span="8"><img  src="/static/img/icon/任务.png" width="40" height="40"></Col>
    </Row>
     <Row class="interact-name">
        <Col span="8">充值</Col>
        <Col span="8">消息</Col>
        <Col span="8">任务</Col>
    </Row>
    </div>
    <div style="margin-top:-20px;"><options></options></div>
  </div>
  </div>
</template>

<script>
import options from '../components/myDetail/options.vue'
export default {
  name: 'app',
  data () {
    return {
      show1: this.$store.state.show1,
      show2:this.$store.state.show2,
      message:this.$store.state.usertel,
      aName:this.$store.state.username,
      opacityNum:0,
      user:[],
    }
  },
  methods:{
    tochat_list(){
      this.$router.push('/chat_list');
    },
    tologin(){
      this.$router.push('/login');
    },
    tocenter(){
      this.$router.push('/center');
    },
    tonews(){
      this.$router.push('/news');
    },
    tosearch(){
      this.$router.push('/search');
    },
    toset(){
      this.$router.push('/set');
    },
    onHandleScroll() {
    //var headerTop = document.getElementById('headerTop')
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 0 && scrollTop <= 180) {
      this.opacityNum = scrollTop/180
      } else if (scrollTop > 180) {
      this.opacityNum = 1
      } else {
      this.opacityNum = 0
      }
    }
  },
  components:{options},
  mounted: function() {

            var _this = this;
          
              if(this.$store.state.show1){
                _this.show2 = false;
                _this.show1 = true;
              }else{
                 _this.show2 = true;
                 _this.show1 = false;
                 var _id = sessionStorage.getItem('id');
                
            _this.$http.post("http://localhost:3000/users/my",{_id:_id},{emulateJSON: true})
            .then(
              (response)=>{
                      // console.log(response.data)
                      _this.user = response.data;
                      // console.log(_this.user)
                      
              },
              (error)=>{
            
              }
            );
              }
  }
}
</script>

<style scoped>
.my{
  
}
.content-two {
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(240, 240, 240);
  text-align: center;
}
.interact-number {
  font-size: 18px;
  margin-top: 15px;
}
.interact-name {
  margin-top: 5px;
  font-size: 10px;
  color: rgb(180, 180, 180);
}
.personal-card{
    position: relative;
    z-index: 1;
}
.user-name {
  margin-left: 10px;
  line-height: 40px;
  font-size: 18px;
}
.user-money{
  margin-left: 100px;
  line-height: 40px;
  font-size: 18px;
}
.content-one{
  height: 50px;
}
.my .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
.wode .mint-cell{
    border-bottom: 1px solid rgb(238, 238, 238);
    background: url("/static/img/my/pback.jpg");
    background-size: 100% 100%;
}
.dengzhu{
    float: right;
    margin-top: 10px;
    margin-right: 40px;
    width: 150px;
    height: 30px;
    border:1px solid rgb(150, 150, 150);
    font-size: 13px;
}
.ziliao{
  position: relative;
  height:100px;
  background: url("/static/img/my/pback.jpg");
  background-size: 100% 100%;
}
.myname{
  position: absolute;
  margin-left: 20px;
  margin-top: 15px;
  font-size: 18px;
  color: white;
}
.myziliao{
  color: white;
  font-size: 13px;
  margin-top: 40px;
  margin-right: 20px;
  float: right;
}
.mymoney{
  position: absolute;
  color: white;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 60px;
  white-space: pre;
}
  .mkuang{
    width: 80px; 
    height: 80px; 
    border-radius: 50%; 
    border: 2px solid #eee; 
    overflow: hidden;
    margin-top:9px;
    margin-left:15px; 
  }
  .mmkuang{
    width: 80px; 
    height: 80px; 
    border-radius: 50%; 
    border: 2px solid #eee; 
    overflow: hidden;
    margin-top:10px;
    margin-left:15px;
    float: left; 
  }

</style>