<template>
  <div class="">
  <mt-navbar  style="font-size:20px">
  <mt-tab-item >设计任务</mt-tab-item>
  </mt-navbar>
      <div v-if="tasks.length ==0" style="text-align: center;font-sise:20px;margin-top:15px;">暂无任务</div>
<!--第yi个卡片 -->
<div style="margin-top:10px;"></div>
     <el-card class="box-card" v-for="(task,index) in tasks" :key="index" style="margin-left:10px;margin-right:10px;margin-bottom:10px;border-radius:5px">   
        <div class="text item" @click="to_task_content(task._id)">
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
            <p class="ttcomtents" > 

             </p>
          </div>  
        </div>
      </el-card> 
       <br/><br/><br/><br/>


  </div>
</template>

<script>
import indexswipe from './homeDetail/indexswipe.vue'

export default {
     data () {
    return {
      tasks:[],
    }
  },
  methods:{
    to_task_content(task_id){
      this.$router.push('/task_content/'+task_id);
    }
  },

  components:{
    // rebang,
    // guanzhu,
    // tuijian,
    indexswipe
  },
       mounted: function() {
            var _this = this;
            _this.$http
            .post(_this.baseUrl+"/task_list/all",{emulateJSON: true})
            .then(
              (response)=>{
                console.log(response);
                _this.tasks = response.data.reverse();   

              },
              (error)=>{
              }
            );
              }

}
</script>

<style>

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