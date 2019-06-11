<template>

<div>
 <!-- <div class="top">
<i class="el-icon-arrow-left b1" @click="t()"></i>
      <p class="p">{{to}}<br>{{zx}}</p>
     
</div> -->
  <mt-header fixed style="background:#ffffff;border-bottom:1px solid #CFCFCF">
      <mt-button icon="back" slot="left"  style="color:black" v-on:click="t()">{{to}}  {{zx}}</mt-button>
    </mt-header>
  <audio id="ding" src="../static/res/ding.mp3">不支持 audio 标签</audio>

  <div class="main" id="messages">
      <!-- <li class="li2"><img src="../assets/1.png"  class="t"><div><p class="t1">zdsadsadsasj</p><span class="to">123123</span></div></li>
      <li class="li2"><img src="../assets/1.png"  class="f"><div><p class="f1">zdsadsadsasj</p><span class="from">dsadsadsadsadsdsadsadsadsadsadsadsadsadsadsadsa</span></div></li> -->
  </div>

  <div class="bom">
    <el-input class="srk" placeholder="请输入内容"  v-model="Msg"></el-input>
    <el-button icon="el-icon-star-off" @click="isshow==false? isshow=true:isshow=false" circle></el-button>

      <el-upload
        class="upload"
        action="http://localhost:3000/api/upload"
        :on-success="handleAvatarSuccess"
        :show-file-list=false
        v-show="Msg==''? true:false">
        <el-button class="tp" icon="el-icon-plus" v-show="Msg==''? true:false" @click="isshow=false" circle></el-button>
      </el-upload>

    <el-button class="upload" icon="el-icon-check" v-show="Msg==''? false:true" type="success" @click="add(Msg);isshow=false" circle></el-button>

    <div v-show="isshow" v-for="(item,index) in bq" :key="index" style="height:180px;overflow:auto;padding-top:10px;padding-bottom:10px;">
    <span class="mybq" v-for="(i,index) in item" :key="index" @click="Msg+=i;isshow=false">{{i}}</span>
    </div>
    
  </div>
</div>



</template>
<script>
  export default {
    data() {
      return {
            str:'',
            from:this.$store.state.user_name,
            to:this.$route.params.id,
            Msg:'',
            user:'',
            bq:[
               ['😂', '😭', '😹', '🙏', '😁', '😃', '😄', '😅',
                '😆', '😇', '😉', '😊', '😋', '😌', '😍', '😘',
                '😚', '😜', '😝', '😎', '😏', '😶', '😐' ,'😒',
                '😳', '😞', '😠', '😡', '😔', '😣', '😖' ,'😫',
                '😩', '😤', '😨', '😰', '😢', '😥', '😵', '👷',
                '😲', '😷', '💤', '🙌', '👏', '👋', '👊', '👌',
                '💪', '👍', '👆', '👇', '👈', '👉', '💩', '😈',
                '👿', '👹', '👺', '💀', '👻', '👽', '😺', '😸',
                '😻', '😼', '😽', '🙀', '😿', '😾', '👄', '💂',
                '👅', '👂', '👃', '👀', '👤', '👶', '👦', '👧',
                '👨', '👩', '👱', '👴', '👵', '👲', '👳', '👮',
                ],
            ],
            isshow:false,
            zx:'离线',
            imgsrc:'',
          }
          },

    methods: {
        t(){
          // this.$router.push('/list')
          this.$router.go(-1)
        },
        tp(){
          $('#upload').click(); 
        },

        handleAvatarSuccess(res, file) {//图片上传成功回调
            let that = this;
            that.imgsrc=res.result
            that.$http.post(that.baseUrl+"/api/addchat",//加插进数据库
            {
            user:this.from,
            from:this.from,
            to:this.to,
            body:this.Msg,
            img:String(this.imgsrc),
            status:1,
            }
            ,{emulateJSON: true})
            .then(
            (response)=>{
            console.log(response); 
            },
            (error)=>{
            console.log(error);
            }
            );

            var req = {
            'addresser':this.from,
            'recipient':this.to,
            'type':'plain',
            'body':this.Msg,
            'img':res.result
            };
            if(this.$store.state.userlist.indexOf(this.to)>-1){
            this.$socket.emit('send_private_message', req);
            }
            else{
            console.log('该用户未登录');
            };
            let str = "<li class='li2'><img src="+this.user[0].user_img+"  class='t'><div><p class='t1'>"+this.from+"</p><span class='to'><img class='img1' src='http://localhost:3000"+res.result+ "'></span></div></li>";
            $('#messages').append(str);
            $('html, body').animate({scrollTop: $(document).height()}, 50);//滚动到底  
            },


        getInfo(to,from){
          var that = this;
          that.$http.get(that.baseUrl+"/api/getchat/" + to + '/' + from)
          .then(
          (response)=>{
              console.log(response)
            var tchat =response.data.msg.chats[0].body;
            if(tchat.length > 0){
              for(var i =0; i < tchat.length; i++){

                if(tchat[i].sender == this.to){//收
                if(tchat[i].img == ''){
                  let str = "<li class='li2'><img src="+this.user[0].user_img+"  class='f'><div><p class='f1'>"+this.to+"</p><span class='from'>" + tchat[i].chat + "</span></div></li>";
                  $('#messages').append(str);
                  $('html, body').animate({scrollTop: $(document).height()}, 50);}//滚动到底
                  else{
                  let str = "<li class='li2'><img src="+this.user[0].user_img+"  class='f'><div><p class='f1'>"+this.to+"</p><span class='from'><img class='img1' src='http://localhost:3000"+tchat[i].img+ "'></span></div></li>";
                  $('#messages').append(str);
                  }
                  }


                  else{//发
                  if(tchat[i].img == ''){
                  let str = "<li class='li2'><img src="+this.$store.state.user_img+"  class='t'><div><p class='t1'>"+this.from+"</p><span class='to'>" + tchat[i].chat + "</span></div></li>";
                  $('#messages').append(str);
                  $('html, body').animate({scrollTop: $(document).height()}, 50);//滚动到底  
                  }
                  else{
                  let str = "<li class='li2'><img src="+this.$store.state.user_img+"  class='t'><div><p class='t1'>"+this.from+"</p><span class='to'><img class='img1' src='http://localhost:3000"+tchat[i].img+ "'></span></div></li>";
                  $('#messages').append(str);
                  }
                  }
              }
            }
        },
        (error)=>{
        console.log("err");
        });
        },


          gai(to,from){
          var that = this;
          that.$http.get("http://localhost:3000/api/getchat1/" + to + '/' + from)
          .then(
          (response)=>{

          },
        (error)=>{
        console.log("err");
        });
        },

        add(Msg){//发
        var that = this;
        if(Msg!=''){
        let str = "<li class='li2'><img src="+this.$store.state.user_img+"  class='t'><div><p class='t1'>"+this.from+"</p><span class='to'>" + this.Msg + "</span></div></li>";
        $('#messages').append(str);
        $('html, body').animate({scrollTop: $(document).height()}, 50);//滚动到底
        var req = {
        'addresser':this.from,
        'recipient':this.to,
        'type':'plain',
        'body':this.Msg,
        'img':''};

        that.$http.post("http://localhost:3000/api/addchat",//加插进数据库
            {
            user:this.from,
            from:this.from,
            to:this.to,
            body:this.Msg,
            img:'',
            status:1,
            }
            ,{emulateJSON: true})
            .then(
            (response)=>{
            console.log(response); 
            },
            (error)=>{
            console.log(error);
            }
            );
            if(this.$store.state.userlist.indexOf(this.to)>-1){
            this.$socket.emit('send_private_message', req);
            }
            else{
            console.log('该用户未登录');
            };

        this.Msg='';
        }
        },

        zt(){//登录状态
          if(this.$store.state.userlist.indexOf(this.to)>-1){
            this.zx=''
            }
            else{
            this.zx=''
            };
        },

        },


        mounted(){//取聊天记录

         var _this = this;

         _this.$http.post(_this.baseUrl+"/users/chat_user",{user_name:_this.to},{emulateJSON: true})
            .then(
              (response)=>{
                      console.log(response.data)
                        _this.user = response.data;   
              },
              (error)=>{
            
              }
            );

        this.getInfo(this.to,this.from);
        $('html, body').animate({scrollTop: $(document).height()}, 50);//滚动到底
        this.zt();
        },

        sockets:{
        connect:function() {//与socket.io连接后回调
        if(this.$store.state.user_name!=''){// 请求加入
        this.$socket.emit('new_user', this.$store.state.user_name);
        console.log(this.$store.state.user_name)
        this.zt();
        }
        },

        login:function(value) {// 第一次登陆接收其它成员信息
        console.log(value);
        for(var i = 0; i < value.length; i++){
        this.$store.state.userlist.push(value[i]);
        console.log(this.$store.state.userlist);
        this.zt();
        }
        },

        user_joined:function (tname, index) {// 监听中途的成员加入
        console.log('中途加入：'+tname);
        if(!(tname in this.$store.state.userlist)){
        this.$store.state.userlist.push(tname);
        console.log(this.$store.state.userlist);
        this.zt();
        }
        },

        user_left:function (data) {// 监听中途的成员离开
        console.log('离开：'+data);
        var index =this.$store.state.userlist.indexOf(data);
        this.$store.state.userlist.splice(index,1);
        console.log(this.$store.state.userlist);
        this.zt();
        },
        
        receive_private_message:function (data) {// 接收私聊信息
        if(data.addresser == this.to){
        document.getElementById('ding').play();
        if(data.img==''){//不是图片
        let str = "<li class='li2'><img src="+this.user[0].user_img+"  class='f'><div><p class='f1'>"+this.to+"</p><span class='from'>" + data.body + "</span></div></li>";
        $('#messages').append(str);
        this.str='';
        $('html, body').animate({scrollTop: $(document).height()}, 50);}//滚动到底
        else{
        let str = "<li class='li2'><img src="+this.user[0].user_img+"  class='f'><div><p class='f1'>"+this.to+"</p><span class='from'><img class='img1' src='http://localhost:3000"+data.img+ "'></span></div></li>";
        $('#messages').append(str);
        $('html, body').animate({scrollTop: $(document).height()}, 50);//滚动到底
        }
        this.gai(this.to,this.from)
        };
        },
      
        },
        }
</script>


<style>
ul li{
list-style: none;
}
span{
word-break:break-all; 
}
.t{
    float: right;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    }
.f{
    float: left;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    }
  .top {
    top: 0;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    position:fixed;
    width: 100%;
    height: 60px;
  }
  .bom {
    background: #fff;
    width: 100%;
    position: fixed;
    border: 0.1px solid  #ccc;
    bottom: 0;
    color: #333;
    text-align: center;
    padding-top: 5px;
  }
  
  .main {
    margin-top: 80px;
    margin-bottom: 80px;
  }
  .li2{
    list-style:none;
    margin-top: 10px;
    padding-left: 10px;
    display: block;
    clear: both;
    overflow: hidden;
  }
  .from{
    padding: 10px;
    border-radius: 10px;
    float: left;
    margin: 6px 10px 0 10px;
    max-width: 310px;
    border: 1px solid #ccc;
    box-shadow: 0 0 3px #ccc; 
    background: #fff;   
    font-size: 20px;
  }
  .to{
    float: right;    
    background: #7cfc00;  
    padding: 10px;
    border-radius: 10px;
    margin: 6px 10px 0 10px;
    max-width: 310px;
    border: 1px solid #ccc;
    box-shadow: 0 0 3px #ccc;
    font-size: 20px;
  }
  .b1{
  float: left;
  width: 10%;
  height: 10%;
  font-size: 60px;
  }

  .srk{
  width: 70%;
  margin-bottom: 5px;
  font-size: 20px;
  }
  .mybq{
    font-size: 28px;
    margin-left: 10px;
    margin-right: 10px;

  }
  .img1{
    max-width: 300px;
    max-height: 300px;
  }
  .upload{
    margin-right: 15px;
    float:right;
    width: 40px;
    height: 40px;
  }
  .t1{
    text-align: right;
    width: 100%;
  }
  .f1{
    text-align: left;
    width: 100%;
  }
  .p{
    text-align: center;
  }



</style>