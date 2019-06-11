<template>
<div class="found">
 <mt-header fixed>
      <mt-button icon="back" slot="left" v-on:click="backtoup2()">返回</mt-button>
  </mt-header>

  <div  id="index_type" class="anav" >
  <mt-navbar v-model="selected" style="">
    <mt-tab-item id="1">发布的任务</mt-tab-item>
    <mt-tab-item id="2">接受的任务</mt-tab-item>
  </mt-navbar>
  
  </div>
  <div id="index_type" class="page-tab-container">
    <mt-tab-container class="page-tabbar-tab-container" v-model="selected" >
      <mt-tab-container-item id="1">
        <uptask></uptask>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
          <downtask></downtask>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</div>
</template>

<script>
import uptask from './uptask.vue'
import downtask from './downtask.vue'
export default {
     data () {
    return {
      selected:"1",
      // images:[
			// 	'/static/img/slide/1.png',
			// 	'/static/img/slide/2.png',
			// 	'/static/img/slide/3.png'
			// ],
    }
  },
  methods:{
    tonews(){
      this.$router.push('/news');
    },
    tosearch(){
      this.$router.push('/search');
    },
    towrite(){
      this.$router.push('/write_communication');
    },
    backtoup2(){
         this.$router.go(-1)
    }
  },
      components:{
    uptask,
    downtask,
    // indexswipe
  }
}
</script>

<style>
.found{
  margin-top: 60px;
}
.found .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
  .anav {
    padding: 0px;
    position:fixed;
    margin-top: -10px;
    z-index: 99;
    width: 100%;
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
    .fxkuang{
  width: 15px; 
  height: 15px; 
  border-radius: 50%; 
  border: 2px solid #eee; 
  overflow: hidden;
  float: left;
  margin-right: 5px;
}
  .fxname{
    float: left;
    font-size: 10px;
    color: gray;
    margin-top: 6px
  }
 
   .fxbiaoti{
    font-size: 15px;
    font-weight:bold;
  }
  .fxcomtents{
   
    font-size: 12px;
    margin-top: 4px;
  }
  .ffcomtents{
    text-overflow: -o-ellipsis-lastline;   
    overflow: hidden;   
    text-overflow: ellipsis;   
    display: -webkit-box;   
    -webkit-line-clamp: 4;    
    -webkit-box-orient: vertical; 
  }
  .fxredu{
    color: gray;
    font-size: 7px;
    margin-top: 20px;
    float: left;
  }
    .fxyonghu{
    float: left;
    font-size: 15px;
  }
 
 
</style>