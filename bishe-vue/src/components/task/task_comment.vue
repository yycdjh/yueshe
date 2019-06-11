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
        <div style="border-radius:50%;border:2px solid #00FFFF;width: 20px;height:20px;"></div><span style="float:left;margin-top:-20px;margin-left:15%;">接受任务</span>
        <div style="border-left:2px solid #00FFFF;height:40px;margin-top:0px;margin-left:9px;"></div>
        <div style="border-radius:50%;border:2px solid #00FFFF;width: 20px;height:20px;"></div><span style="float:left;margin-top:-20px;margin-left:15%;">完成任务</span>
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

  },
      mounted: function() {
            var _this = this;
            var author_id = _this.$store.state.id;
    
            _this.$http.post("http://localhost:3000/task_list/down_task",{author_id:author_id},{emulateJSON: true})
            .then(
              (response)=>{
                      // console.log(response.data)
                       _this.tasks = response.data.reverse();
                      // console.log(_this.user)
                      
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