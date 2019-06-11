<template>
  <div class="regist">

    <mt-header fixed title="注册账户">
      <mt-button icon="back" slot="left" v-on:click="backtoL()"></mt-button>
    </mt-header>

    <div class="rpage">
    <div class="welcome2">
        <img src="/static/img/logo.png" width="202" height="148">
    </div>


    <mt-field label="昵称" placeholder="请输入昵称" class="user" v-model="userInfo.name"></mt-field>
    <mt-field label="手机" placeholder="请输入手机号" type="tel" class="password" v-model="userInfo.tel"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" class="password" v-model="userInfo.psw"></mt-field>
 

    <div class="registInfo">
        <mt-button type="primary" size="large" @click="register()">注册</mt-button> 
    </div>

    <div class="xiamiao">
        <span>—— 社交账号直接登录 ——</span><br><br>
        <img src="/static/img/something.jpg" width="200" height="35">
    </div>

    <div class="Ways">
        <span v-on:click="denglu1()">已有账号登录</span>
        <span>|</span>
        <span>随便看看</span>
    </div>
    </div>
  </div>
</template>

<script>
    export default {
       data(){
           return {
               timer: null,
            userInfo:{
                name:'',
				tel:'',
				psw:'',				
            }
              
           }
       },
       methods:{
           denglu1(){
               this.$router.push('/login')
           },
           backtoL:function(){
               this.$router.go(-1)
           },
           		autoPlay4(){ 
					this.$indicator.close();
					this.$toast({message:'不能为空！',position:'bottom'});
					},
		autoPlay33(){ 
					this.$indicator.close();
					this.$toast({message:'输入密码不一致！',position:'bottom'});
					},
		autoPlay44(){ 
                    this.$indicator.close();
                    this.$toast({message:'注册成功',position:'bottom'});
					this.$router.push('/login');
					},  
					play4 () { 
					this.timer = setTimeout(this.autoPlay4, 1000) 
					},
					play44 () { 
					this.timer = setTimeout(this.autoPlay44, 1000) 
					},
					play33 () { 
					this.timer = setTimeout(this.autoPlay33, 1000) 
					},
           register(){
    if(this.userInfo.name == "" || this.userInfo.tel == "" || this.userInfo.psw == ""){
        this.$indicator.open();
		this.play4();
}

    else{
//        this.$store.state.username=this.userInfo.name;
//        this.$store.state.usertel=this.userInfo.tel;
//        this.$store.state.userpsw=this.userInfo.psw;
//        this.$indicator.open();
//        this.play44();
     
      var _this = this;
            var user_name = _this.userInfo.name;
            var psw = _this.userInfo.psw;
            var user = _this.userInfo.tel;
            var money = 0;
            var user_img = 'http://localhost:3000/images/touxiang/0.jpg';
            this.$http.post("http://localhost:3000/users/up",{user_name:user_name,psw:psw,user:user,user_img:user_img,money:money},{emulateJSON: true})
            .then(
              (response)=>{
                    this.$indicator.open();
                    this.play44();
                // console.log(response); 
              },
              (error)=>{
                  alert('用户已存在'); 
                console.log(error);
              }
            );
   }
}
       }
    }
</script>

<style>
.regist{
  margin-top: 40px;
  background:white;
  position: absolute;
  width: 100%;
  height: 100%;
}
.regist .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
.welcome2{
    margin-top: 50px;
    text-align:center;
}
.user{
    width: 90%;
    margin: 50px auto 0;
    border: 1px solid rgb(189, 189, 189);
}
.password{
    width: 90%;
    margin: 0 auto;
    border: 1px solid rgb(189, 189, 189);
}
.registInfo .mint-button{
    margin: 15px auto 0;
    width: 90%;
    background-color: rgb(104, 223, 152);

}
.nextFoot{
    text-align: center;
    margin-top:15px;
    color: rgb(202, 187, 187);
    font-size: 14px;
}
.xiamiao{
    text-align: center;
    margin-top: 70px;
}
.Ways{
    text-align: center;
    color: rgb(62, 168, 142);
    margin-top: 20px;
}
</style>