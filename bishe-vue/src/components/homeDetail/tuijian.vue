<template>
  <div class="tuijian">

 <el-card class="box-card" v-for="(communication,index) in communications" :key="index">   <!--第yi个卡片 -->
        <div class="text item" @click="tohtneirong2(communication._id)">
          <div class="tjbiaoti">{{communication.communication_name}}</div>
          <div class="tjyonghu">
          <div class="tjkuang">
          <img  :src="communication.author_img" width="15" height="15">
          </div>  
      <div class="tjname">{{communication.author}}</div>
      </div>
          <div class="tjcomtents">
            <img :src="communication.communication_img" class="tjimg"/>
             <span class="ttcomtents"> 
               {{communication.summary}}
             </span>
          </div>  
          <div class="tjredu">
                25万热度
          </div> 
        </div>
      </el-card> 
<!--第yi个卡片结束 -->
      <br/><br/><br/><br/>
<!--第yi个卡片结束 -->
      


    
  </div>

</template>

<script>
import indexswipe from './indexswipe.vue'
export default {
 
    data () {
		return {
      communication_id:'',
      communications:[],
		}
  },
     methods:{
    tohtneirong2(communication_id){
      this.$router.push('/htneirong2/'+communication_id);
    }
    },
     mounted: function() {
            var _this = this;
          
    
            _this.$http.post("http://localhost:3000/communication_list/all",{emulateJSON: true})
            .then(
              (response)=>{
                      // console.log(response.data)
                       _this.communications = response.data.reverse();
                      // console.log(_this.user)
                      
              },
              (error)=>{
            
              }
            );
              }

  }


</script>

<style>
.tuijian{
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
    float: left;
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
    float: left;
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