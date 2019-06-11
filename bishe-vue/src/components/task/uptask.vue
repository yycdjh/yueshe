<template>
  <div class="jinri">
<div v-if="tasks.length ==0" style="text-align: center;font-sise:20px;margin-top:15px;">暂无帖子</div>
     <el-card class="box-card" v-for="(task,index) in tasks" :key="index">   
        <div class="text item" @click="tohtneirong3(task._id)">
          <div class="tjbiaoti">{{task.task_name}} <span style="float: right; color:red">赏金：{{task.money}}</span></div>
          <div class="tjyonghu">
          <div class="tjkuang">
          <img  :src="task.author_img" width="15" height="15">
          </div>  
      <div class="tjname">{{task.author}}  <span style="float: right; color:black;">竞标人数：{{task.bidding_user_arr.length}}</span></div>
      </div>
          <div class="tjcomtents">
            <!-- <img :src="communication.communication_img" class="tjimg"/> -->
             <span class="ttcomtents"> 
               {{task.summary}}
             </span>
          </div>  
        </div>
        
      </el-card> 
     <br/>  <br/>  <br/>  <br/>
  </div>
</template>

<script>
export default {
  
  data(){
    return {
      xiaonei_id:'',
      tasks:[],
    }
   },
   methods:{
    towenzhang(){
      this.$router.push('/wenzhang');
    },
    tonews(){
      this.$router.push('/news');
    },
        tohtneirong3(task_id){
      this.$router.push('/htneirong3/'+task_id);
    },
    tosearch(){
      this.$router.push('/search');
    },
    tohtneirong(communication_id){
      this.$router.push('/htneirong/'+communication_id);
    },
    },
    mounted: function() {
            var _this = this;
            var author_id = _this.$store.state.id;
    
            _this.$http.post("http://localhost:3000/task_list/up_task",{author_id:author_id},{emulateJSON: true})
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
.jinri{
    margin-top: 60px;
}
.text {
    font-size: 14px;
  }
.item {
    margin-bottom: 18px;  
  }
.box-card {
    padding: 10px;  
  }
.tjname{
    font-size: 10px;
    color: gray;
    margin-top: 6px
  }
 .tjbiaoti{
    font-size: 15px;
    font-weight:bold;
  }
.tjcomtents{ 
    font-size: 12px;
    margin-top: 4px;
    float: left;
  }
.tjredu{
    color: gray;
    font-size: 7px;
    margin-top: 20px;
    float: left;
  }
.tjyonghu{
    font-size: 15px;
  }
.tjimg{
    width: 100%;
    height: 10%;
  }
.tjkuang{
  width: 15px; 
  height: 15px; 
  border-radius: 50%; 
  border: 2px solid #eee; 
  overflow: hidden;
  float: left;
  margin-right: 5px;
}
.ttcomtents{  
    font-size: 12px;
    margin-top: 4px;
    text-overflow: -o-ellipsis-lastline;   
    overflow: hidden;   
    text-overflow: ellipsis;   
    display: -webkit-box;   
    -webkit-line-clamp: 2;    
    -webkit-box-orient: vertical;  
  }
</style>