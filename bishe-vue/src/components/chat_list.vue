<template>
<div id="loading">
    <mt-header style="background:#ffffff;border-bottom:1px solid #CFCFCF">
      <mt-button icon="back" slot="left"  style="color:black" v-on:click="back()"></mt-button>
    </mt-header>
<audio id="ding" src="../static/res/ding.mp3">不支持 audio 标签</audio>
<!-- <router-link :to="'/chathome/' +'zsj'">
  <li  class="li1">
    <img src="../assets/1.png"  class="c">
    <div class="box">
      <p class="name" id="zsj">zsj</p>
      <p class="msg">zsdsadsadsadsadwadsadsadsadsadsaf</p>  
    </div>
    <span class="time" >11:20
      <el-badge :value="100" :max="99" ></el-badge>
      </span>
    </li>
   </router-link> -->

</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
      mounted(){//获取聊天列表
        this.$socket.emit('new_user', this.$store.state.user_name);//把名字插入列表
        var that=this;
        var user=this.$store.state.user_name;
        that.$http.get(that.baseUrl+"/api/getchatlist/" + user)
        .then(
        (response)=>{
        var jl =response.data.msg.list;
        if(jl.length>0){
        for(var i = 0; i < jl.length; i++){
        var to;
        if(this.$store.state.user_name == jl[i].from){
        to =jl[i].to;
        }
        else{
        to =jl[i].from;
        }
        var text =jl[i].body[jl[i].body.length-1].chat;
        if(text==''){
          text="[图片信息]"
        }

        var badge=0;//未读消息
        var none="";
        for(var j = 0; j < jl[i].body.length; j++){
           if(jl[i].body[j].sender==to){
             badge=parseInt(badge+parseInt(jl[i].body[j].status));
           }
        }
        if(badge==0){none="none"};//是否为0，为0隐藏
        var arr="<a href='/chat/"+to+"'><li id="+to+" class='li1'><img src='http://localhost:3000/images/touxiang/0.jpg'  class='c'><div class='box'><span class='name'>"+to+that.zt(to)+"</span><p id="+to+"m class='msg'>" +text+ "</p></div><p class='time'>"+jl[i].body[jl[i].body.length-1].ttime+"<sup id="+to+"b class='el-badge__content' style='display: "+none+";'>"+badge+"</sup></p></li></router-link>"
        $('#loading').append($(arr));
          }
        }
        },
        (error)=>{
        console.log("err");
        }
        );
  
      },
      methods: {
        back(){
            this.$router.go(-1);
        },
        zt(t){//登录状态
          if(this.$store.state.userlist.indexOf(t)>-1){
            var zx='';
            return zx;
            }
            else{
            var zx='';
            return zx;
            };
        },
      },

      sockets:{
      connect:function() {//与socket.io连接后回调
      if(this.$store.state.user_name!=''){// 请求加入
      this.$socket.emit('new_user', this.$store.state.user_name);
      // console.log(this.$store.state.user_name);
      }
      },


      //在线离线
      login:function(value) {// 第一次登陆接收其它成员信息
      // console.log(value);
      for(var i = 0; i < value.length; i++){
      this.$store.state.userlist.push(value[i]);
      $('#'+value[i]+'span').text(value[i]);
      }

      },

      user_joined:function (tname, index) {// 监听中途的成员加入
      // console.log('中途加入：'+tname);
      if(!(tname in this.$store.state.userlist)){
      this.$store.state.userlist.push(tname);
      // console.log(this.$store.state.userlist);
      $('#'+tname+'span').text(tname);
      }
      },

      user_left:function (data) {// 监听中途的成员离开
      // console.log('离开：'+data);
      var index =this.$store.state.userlist.indexOf(data);
      this.$store.state.userlist.splice(index,1);
      // console.log(this.$store.state.userlist);
      $('#'+data+'span').text(data+'（离线）');
      },


    // 接收私聊信息
      receive_private_message:function (data) {//
      document.getElementById('ding').play();
      $('#'+data.addresser+'m').text(data.body);
      
      var b = $('#'+data.addresser+'b').text();
      b=parseInt(b)+1;
      $('#'+data.addresser+'b').text(b);
      $('#'+data.addresser+'b').css("display","")
      // document.getElementById(data.addresser+'m')
      },
      
      }
      }
</script>

<style>
a:link,a:visited{
 text-decoration:none;  /*超链接无下划线*/
}
a:hover{
 text-decoration:underline;  /*鼠标放上去有下划线*/
}
.c{
 margin-left: 10px;
 width: 60px;
 height: 60px;
}
.box{
 width: 60%;
}
.name{
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}
.msg{
  height: 20px;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
}
.time{
  width: 10%;
  color: gray;
}
.li1{
  height: 80px;
  display: flex; 
  align-items: center;
  justify-content: space-around; 
  list-style:none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.17);
}
</style>
