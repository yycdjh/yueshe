<template>
  <div class="write">
    <mt-header fixed>
      <mt-button icon="back" slot="left" v-on:click="back()"></mt-button>
    </mt-header>
    <Form  :label-width="80" class="seat">
      <Form-item >
      <Input  v-model="task_name" placeholder="请输入需求名字" style="width:110%;"></Input>
      </Form-item>
      <Form-item>
      <Input  v-model="money" placeholder="请输入赏金" style="width:110%;"></Input>
      </Form-item>
      <!-- <Form-item label="类型">
        <Checkbox-group v-model="classification">
            <Checkbox label="Logo设计"  ></Checkbox>
            <Checkbox label="UI设计"></Checkbox>
            <Checkbox label="广告设计"></Checkbox>
            <Checkbox label="包装设计"></Checkbox>
        </Checkbox-group>
      </Form-item> -->
      <Form-item >
        <Select v-model="classification" placeholder="请选择" style="width:110%;">
            <Option value="0">Logo设计</Option>
            <Option value="1">UI设计</Option>
            <Option value="2">广告设计</Option>
            <Option value="3">包装设计</Option>
        </Select>
      </Form-item>
      <Form-item >
        <Input  type="textarea" v-model="summary" :autosize="{minRows: 3,maxRows: 5}" style="width:110%;" placeholder="请输入详细描述..."></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" style="width:110%;" @click="push()">提交</Button>
      </Form-item>
      </Form>
    <vue-particles
        color="#6E6E6E"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#6E6E6E"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
    </vue-particles>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        task_name:'',
        summary:'',
        money:'',
        classification:'',
        pass:"false"
      };
    },
    methods: {
      back(){
               this.$router.go(-1);
           },
      push(){
        if(window.confirm('你确定要发布任务吗？')){
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
        var time = _this.currentDate
        var task_name = _this.task_name;
        var summary = _this.summary;
        var money = _this.money;
        var author = _this.$store.state.user_name;
        var author_id = _this.$store.state.id;
        var author_img = _this.$store.state.user_img;
        let classification = _this.classification;
        let state = 0;
        let pass = _this.pass;
        _this.$http
        .post(_this.baseUrl+"/task_add/add",
        {state:state,author_id:author_id,task_name:task_name,money:money,summary:summary,author:author,classification:classification,author_img:author_img,time:time,pass:pass},
        {emulateJSON: true})
        .then(
          (response)=>{
            this.$Message.success('发布成功');
            this.$router.push('/index');
            // console.log(response.data); 
          },
          (error)=>{
            this.$Message.error('发布失败');
            // console.log(error);
          }
        );
      }
    }
  }
</script>

<style>
.seat{
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  padding-top: 10%;
  margin-left: -15%;
}
.lizi{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
}
.write{
  position: absolute;
  margin-top: 50px;
  background:white;
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