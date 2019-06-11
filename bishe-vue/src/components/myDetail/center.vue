<template>
<div class="center">
    <mt-header title="个人主页" fixed>
        <mt-button icon="back" slot="left" v-on:click="tomy()"></mt-button>
    </mt-header>

    <div class="cpage">
    <div class="btouxiang">
        <div>
        <el-upload
          action="http://localhost:3000/upload/touxiang"
      
          :show-file-list="false"
          :data="user_id"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="user.user_img" width="100" height="100">
          </el-upload>
        </div>
    </div>

    <div v-show="showSet1">

      <div class="bianji">
      <span class="bname">{{user.user_name}}   {{user.sex}}</span>
      <span class="bcibi">{{user.old}}   {{user.like}}</span>
      <mt-button class="mbtn" type="primary" @click="hide">编辑个人资料</mt-button>
      </div>
      <div style="height:20px;background: rgb(241, 241, 241);"></div>
      <div class="myguan">
        
        <div class="guan">
          <span style="white-space:pre;">  0</span><br>
          <span>关注</span>
        </div>

        <div class="xian"></div>

        <div class="bei">
          <span style="white-space:pre;">    0</span><br>
          <span>被关注</span>
        </div>

      </div>
      <div style="height:20px;background: rgb(241, 241, 241);"></div>
      <div class="jieshao">  
        <span>个人简介：{{user.introduction}}</span>
      </div>

    </div>

    <div v-show="showSet2">
    <mt-field label="昵称" placeholder="请输入昵称" v-model="user.user_name"></mt-field>
    <mt-field label="个人简介" placeholder="请输入个人简介" type="textarea" rows="4" v-model="user.introduction"></mt-field>
    <mt-cell title="性别" style="width:200px;">
    <div>
    <input type="radio" id="one" value="男" v-model="user.value"><label for="one">男</label>
    <input type="radio" id="two" value="女" v-model="user.value"><label for="two">女</label>
    </div>
    </mt-cell>
    <mt-field label="城市" placeholder="输入所在城市" v-model="user.like"></mt-field>
    <mt-field label="生日" placeholder="Input birthday" type="date" v-model="user.birthday"></mt-field>
    <mt-button type="default" size="large"  class="quxiao" @click="noshow()">取消</mt-button>
    <mt-button type="primary" size="large" class="queding" @click="show()">确定</mt-button>

    </div>
    

    </div>
    
    
    
    
</div>
</template>

<script>

  export default {
  name: 'app',
  data () {
    return {
      showSet1:true,
      showSet2:false,
      username:this.$store.state.username,
      introduction:this.$store.state.introduction,
      value:this.$store.state.value,
      usercity:this.$store.state.usercity,
      birthday:this.$store.state.birthday,
      like:this.$store.state.like,
      user:[],
      imageUrl:"/static/img/touxiang/0.png"

    }
  },

  methods:{
    tomy(){
       this.$router.go(-1)
    },
    hide(){
       this.showSet1 = false;
       this.showSet2 = true;
     
    },
    show(){
       this.showSet1 = true;
          this.showSet2 = false;
      //  this.$store.state.username = this.username;
      //  this.$store.state.introduction = this.introduction;
      //  this.$store.state.value = this.value;
      //  this.$store.state.usercity = this.usercity;
      //  this.$store.state.birthday = this.birthday;
            var _this = this;
            var _id = _this.$store.state.id
            var user_name = _this.user.user_name;
            var introduction = _this.user.introduction;
            var sex = _this.user.value;
            var like = _this.user.like;
            var old = _this.user.birthday;

            this.$http.post("http://localhost:3000/users/update",{_id:_id,user_name:user_name,introduction:introduction,sex:sex,like:like,old:old},{emulateJSON: true})
            .then(
              (response)=>{
                  //  _this.user = response.data
                  // _this.$store.state.username =  _this.user.user_name;
                  //  _this.$store.state.introduction =  _this.user.introduction;
                  //   _this.$store.state.value =  _this.user.sex;
                  //    _this.$store.state.like = _this.user.like;
                  //     _this.$store.state.birthday =  _this.user.birthday;
                // console.log( _this.user); 
                _this.$router.go(-1);
                _this.$toast('保存成功');
                
             
              },
              (error)=>{
                  
                console.log(error);
              }
            );
    },
    noshow(){
      this.showSet1 = true;
       this.showSet2 = false;
    },
    handleAvatarSuccess(res, file) {
       this.user = res
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

  },
   computed:{
      user_id:function(){
        return {"user_id":this.$store.state.id}
      }
  },
   mounted: function() {
            var _this = this;
          
              if(this.$store.state.show1){
                _this.show2 = false;
                _this.show1 = true;
              }else{
                 _this.show2 = true;
                 _this.show1 = false;
                 var _id = _this.$store.state.id
            _this.$http.post("http://localhost:3000/users/my",{_id:_id},{emulateJSON: true})
            .then(
              (response)=>{
                      // console.log(response.data)
                      _this.user = response.data;
                      _this.$store.state.username =  _this.user.user_name;
                      console.log(_this.$store.state.username)
                    // _this.$store.state.introduction =  _this.user.introduction;
                    // _this.$store.state.value =  _this.user.sex;
                    //  _this.$store.state.like = _this.user.like;
                    //    _this.$store.state.birthday =  _this.user.birthday;
                       console.log(_this.user)
                      
              },
              (error)=>{
            
              }
            );
              }
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
</style>


