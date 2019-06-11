<template>
<div class="news">
    <mt-header fixed title="消息">
      <mt-button icon="search" slot="right" @click="tosearch()"></mt-button>
      <mt-button icon="back" slot="left" v-on:click="backtoup()"></mt-button>
  </mt-header>

  <div class="npage">
    <div style="height:30px;background:white;"></div>
    <div class="newsup">
      <img slot="icon" src="/static/img/icon/评论.png" width="30" height="30">
      <img slot="icon" src="/static/img/icon/喜欢和赞.png" width="30" height="30" style="margin:0 100px;">
      <img slot="icon" src="/static/img/icon/关注.png" width="30" height="30"><br>
      <span>评论</span>
      <span style="margin:0 82px;">喜欢和赞</span>
      <span>关注</span><br>
      <img slot="icon" src="/static/img/icon/投稿请求.png" width="30" height="30" style="margin-top:30px;">
      <img slot="icon" src="/static/img/icon/赞赏和付费.png" width="23" height="28" style="margin:0 105px;">
      <img slot="icon" src="/static/img/icon/其他提醒.png" width="21" height="30"><br>
      <span>投稿请求</span>
      <span style="margin:0 58px;">赞赏和付费</span>
      <span>其他提醒</span>
    </div>
    <div style="height:30px;background:white;"></div>
    <div style="height:20px;background: rgb(250, 250, 250);"></div>
    <div class="newsdown">
      <span style="margin-left:20px;float: left;">繁信</span>
      <span style="margin-right:20px;float: right;color:green;">新繁信</span>
    </div>
    <div class="newsdown2">
      <img slot="icon" src="/static/img/icon/no.png" width="200" height="100">
    </div>
 

  </div>

</div>
</template>

<script>
export default {
     data () {
    return {
      selected:"1"
    }
  },
  methods:{
      backtoup(){
          this.$router.go(-1)
      },
      tosearch(){
      this.$router.push('/search');
    }
  }
}
</script>

<style>
.news{
  margin-top: 60px;
}
.news .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
.newsup{
  text-align: center;
  background: white;
}
.newsdown{
  height: 40px;
  background: white;
  border-bottom: 1px solid rgb(238, 238, 238);

}
.newsdown span{
  line-height: 40px;

  
}
.newsdown2{
  text-align: center;
  margin-top: 80px;
}

</style>