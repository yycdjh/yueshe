<template>
  <div class="write">

    <mt-header fixed>
      <mt-button icon="back" slot="left" v-on:click="backtoup11()"></mt-button>
      <h1 slot="right" @click="push()">发布</h1>
    </mt-header>

    <div class="write11" role="form">
     
        <mt-field placeholder="请输入详细描述" type="textarea" rows="5" v-model="img_name"></mt-field>
        
      
    </div>
          <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/upload/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        task_name:'',
        summary:'',
        img_name:'',
        money:'',
        pass:"false"
      };
    },
    methods: {
      backtoup11(){
               this.$router.go(-1);
           },
      handleAvatarSuccess(res, file) {
        console.log(res[0].filename);

        this.imageUrl = URL.createObjectURL(file.raw);
        this.communication_img = 'http://localhost:3000/images/upload/' + res[0].filename;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      push(){
        if(window.confirm('你确定要发布图片吗？')){
                 //alert("确定");
                  this.add();
                 return true;
              }else{
                 //alert("取消");
                 return false;
             }
      },
      add(){
            var _this = this;
            _this.currentDate =  new Date().toLocaleString();
            let img_url = _this.communication_img;
            let time =  _this.currentDate;
            let user_img = _this.$store.state.user_img
            let user_id = _this.$store.state.id
            let user = _this.$store.state.user
            let user_name = _this.$store.state.user_name
            let img_name = _this.summary;
            
        
            let pass = _this.pass;
            this.$http.post("http://localhost:3000/img/add",{img_url:img_url,time:time,user_img:user_img,user_id:user_id,user:user,user_name:user_name,img_name:img_name},{emulateJSON: true})
            .then(
              (response)=>{
                this.$router.push('/show/'+user_id);
                // console.log(response.data); 
                
                
              },
              (error)=>{
                  
                console.log(error);
              }
            );
          }
    }
  }
</script>

<style>
.write{
  margin-top: 50px;
  background:white;
  position: absolute;
  width: 100%;
  height: 100%;
}
.write .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
.ahr{
  width: 100%;
  height:1px;
  border:none;
  border-top:1px dashed rgb(216, 216, 216);

}

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>