<template>
  <div class="benyue">
    <div v-if="tasks.length ==0" style="text-align: center;font-sise:20px;margin-top:15px;">暂无帖子</div>

    <el-card class="box-card" v-for="(task,index) in tasks" :key="index" style="margin-left:10px;margin-right:10px;margin-bottom:10px;border-radius:10px">   
      <div slot="header" class="clearfix">
      <span style="font-size:16px;">{{task.task_name}}</span><span style="float:right">赏金：{{task.money}}</span>
      </div>
      <div style="margin-left:10%;">
        <div style="border-radius:50%;border:2px solid #00FFFF;width: 20px;height:20px;background:#00FFFF;"></div><span style="float:left;margin-top:-20px;margin-left:15%">接受任务</span>
        <div style="border-left:2px solid #00FFFF;height:40px;margin-top:0px;margin-left:9px;"></div>
        <div style="border-radius:50%;border:2px solid #00FFFF;width: 20px;height:20px;" v-if="task.state ==1"></div><span v-if="task.state ==1" style="float:left;margin-top:-20px;margin-left:15%;">提交任务<Button type="text" style="margin-left:50px;" v-on:click="state1(task._id)">提交</Button></span>
        <div style="border-radius:50%;border:2px solid #00FFFF;width: 20px;height:20px;background:#00FFFF;" v-if="task.state ==2||task.state ==3"></div><span v-if="task.state ==3||task.state ==2" style="float:left;margin-top:-20px;margin-left:15%;">提交任务</span>
        <div style="border-left:2px solid #00FFFF;height:40px;margin-top:0px;margin-left:9px;"></div>
        <div style="border-radius:50%;border:2px solid #00FFFF;width: 20px;height:20px;" v-if="task.state !=3"></div><span v-if="task.state !=3" style="float:left;margin-top:-20px;margin-left:15%;">完成任务</span>
        <div style="border-radius:50%;border:2px solid #00FFFF;width: 20px;height:20px;background:#00FFFF;" v-if="task.state ==3"></div><span v-if="task.state ==3" style="float:left;margin-top:-20px;margin-left:15%;">完成任务</span>
      </div>
    </el-card> 

     <br/>  <br/>  <br/>  <br/>
  </div>
</template>

<script>
export default {
     data () {
    return {
      xiaonei_id:'',
      tasks:[],
      id:'',
    }
  },
  methods:{
     tohtneirong(){
      this.$router.push('/htneirong');
    },
     towenzhang(){
      this.$router.push('/wenzhang');
    },
      tohtneirong3(task_id){
      this.$router.push('/htneirong3/'+task_id);
    },
    tonews(){
      this.$router.push('/news');
    },
    tosearch(){
      this.$router.push('/search');
    },
    state1(task_id){
      var _this = this;
      var _id = task_id;
      _this.$http.post(_this.baseUrl+"/task_list/state1",{_id:_id},{emulateJSON: true})
      .then(
        (response)=>{
          if(response.data.ok==1){
            _this.$http.post(_this.baseUrl+"/task_list/findOne",{_id:_id},{emulateJSON: true})
      .then(
        (response)=>{
          _this.task = response.data;
          _this.bidding_user_arr = response.data.bidding_user_arr.reverse()    
        },
        (error)=>{
      
        }
      );
      var author_id = _this.$store.state.id;
      _this.$http.post("http://localhost:3000/task_list/down_task",{author_id:author_id},{emulateJSON: true})
      .then(
      (response)=>{
              console.log(response.data)
              _this.tasks = response.data.reverse();
      },
      (error)=>{
    
      }
    );
      }
        },
        (error)=>{
      
        }
      );
      
        },

  },
  mounted: function() {
    var _this = this;
    var author_id = _this.$store.state.id;
    _this.id = _this.$store.state.id;
    _this.$http.post("http://localhost:3000/task_list/down_task",{author_id:author_id},{emulateJSON: true})
    .then(
      (response)=>{
              console.log(response.data)
              _this.tasks = response.data.reverse();
      },
      (error)=>{
    
      }
    );
  }
}
</script>

<style>
.benyue{
    margin-top: 60px;
    position: relative;
}
</style>