<template>
<div class="found">
<mt-header fixed>
      <h1 slot="left">发现</h1>
      <mt-button icon="search" slot="right" @click="tosearch()"></mt-button>
      <mt-button slot="right"  style="margin-left:20px;" @click="towrite()">
      <img src="/static/img/icon/+.png" width="16" height="16" slot="icon">
      </mt-button>
</mt-header>

  
  <div  id="index_type" class="anav" >
    <img src="/static/img/zhuanti/bg.jpg" width="400">
  <div style="height:10px;background: rgb(250, 250, 250);"></div>
    <mt-navbar v-model="selected" style="margin-top:-15px;">
  <mt-tab-item id="1">我的帖子</mt-tab-item>
  <mt-tab-item id="2">论坛</mt-tab-item>
  </mt-navbar>
  
</div><br><br><br>

    <div id="index_type" class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="selected" >
        <mt-tab-container-item id="1">
          <my_forum></my_forum>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <forum></forum>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

</div>
</template>

<script>
import forum from './foundDetail/forum.vue'
import my_forum from './foundDetail/my_forum.vue'
import indexswipe from './homeDetail/indexswipe.vue'
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
    }
  },
      components:{
    forum,
    my_forum,
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