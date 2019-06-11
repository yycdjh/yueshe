<template>
  <div class="login">

    <mt-header fixed title="登录账户">
      <mt-button icon="back" slot="left" v-on:click="backtomy()"></mt-button>
    </mt-header>

    <div class="lpage">
    <div class="welcome">
        <img src="/static/img/logo.png" width="202" height="148">
    </div>

    <mt-field label="手机号" placeholder="请输入手机号" class="user" v-model="userInfo.tel"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" class="password" v-model="userInfo.psw"></mt-field>
    <div class="Info"><mt-button type="primary" size="large" @click="login()">登录</mt-button></div>
    
    <div class="fontcssstyle">
        <span v-on:click="fogot()">忘记密码?</span>
    </div>
    <div class="xiamiao">
        <span>—— 社交账号直接登录 ——</span><br><br>
        <img src="/static/img/something.jpg" width="200" height="35">
    </div>
    <div class="Ways">
        <span v-on:click="zhuce()">注册</span>
        <span>|</span>
        <span>随便看看</span>
        <span>|</span>
        <span>登录遇到问题？</span>
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
				tel:'',
				psw:''
				
			}
           }
       },
       methods:{
           backtomy:function(){
               this.$router.go(-1)
           },
           zhuce:function(){
                this.showPage=false;
                this.$router.push({path:'/regist'})
           },
           fogot:function(){
               
           },
        autoPlay4(){ 
					this.$indicator.close();
                    this.$Message.warning('请输入手机号和密码！');
					}, 
		autoPlay444(){ 
                    this.$indicator.close();
                    this.$Message.success('登录成功');
                    this.$router.push('/my');

					},
		autoPlay4444(){ 
					this.$indicator.close();
                    this.$Message.error('手机号或密码输入错误！');
					}, 
					play4 () { 
					this.timer = setTimeout(this.autoPlay4, 1000) 
					},
					play444() { 
					this.timer = setTimeout(this.autoPlay444, 1000) 
					},
					play4444() { 
					this.timer = setTimeout(this.autoPlay4444, 1000) 
					},
		    login(){
                if(this.userInfo.tel == "" || this.userInfo.psw == ""){
	                this.$indicator.open();
                    this.play4()
                }else{
                  var _this = this;
               var psw = _this.userInfo.psw;
               var user = _this.userInfo.tel;
            this.$http.post("http://localhost:3000/users/login",{psw:psw,user:user},{emulateJSON: true})
            .then(
              (response)=>{
                    
                if(response.data.length == 0){
              _this.$indicator.open();
                 _this.play4444();
                  }
                 else{
                     
                _this.$store.state.id =response.data[0]._id;
                _this.$store.state.user =response.data[0].user;
                _this.$store.state.user_img =response.data[0].user_img;
                 _this.$store.state.user_name =response.data[0].user_name;
                 sessionStorage.setItem('id',response.data[0]._id);
                 sessionStorage.setItem('user',response.data[0].user);
                 sessionStorage.setItem('user_img',response.data[0].user_img);
                 sessionStorage.setItem('user_name',response.data[0].user_name);
                _this.$store.state.show1 = false;
                _this.$store.state.show2 = true;
                console.log(123);
                _this.$socket.emit('new_user', _this.$store.state.user_name);
            //    console.log(this.$store.state.id); 
            //    console.log(this.$store.state.user); 
            //    console.log(_this.$store.state.user_img); 
            //    console.log(  time ); 
                 _this.$indicator.open();
                    _this.play444();
                 }
             
              },
              (error)=>{
              
                console.log(error);
              }
            );
            
                }
		}
       }
    }
</script>

<style>
.login{
  margin-top: 40px;
  background:white;
  position: absolute;
  width: 100%;
  height: 100%;
}
.login .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
.welcome{
    margin-top: 50px;
    text-align:center;
}
.Info .mint-button{
    margin: 15px auto 0;
    width: 90%;
    background-color: rgb(104, 183, 223);
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
.fontcssstyle{
    color: rgb(62, 168, 142);
    text-align: center;
    margin-top: 15px;
}
.Ways{
    text-align: center;
    color: rgb(62, 168, 142);
    margin-top: 20px;
}
.xiamiao{
    text-align: center;
    margin-top: 50px;

}

</style>