<template>
<div class="set">
  <mt-header fixed title="设置">
      <mt-button icon="back" slot="left" v-on:click="tomy()"></mt-button>
  </mt-header>
  <div>
  <mt-cell title="消息推送" class="xxts"></mt-cell>
  <mt-cell title="文章推送更新">
    <mt-switch v-model="value"></mt-switch>
  </mt-cell>
  <mt-cell title="新消息推送">
    <mt-switch v-model="value"></mt-switch>
  </mt-cell>
  <mt-cell title="通用设置" class="tysz"></mt-cell>
  <mt-cell title="赞赏设置"></mt-cell>
  <mt-cell title="字号设置"></mt-cell>
  <mt-cell title="隐私设置"></mt-cell>
  <mt-cell title="黑名单设置"></mt-cell>
  <mt-cell title="其他" class="tysz"></mt-cell>
  <mt-cell title="清除缓存" value="当前缓存44.7Mb"></mt-cell>
  <mt-cell title="版本更新" value="已是最新版本"></mt-cell>
  <mt-cell title="关于我们"></mt-cell>
  <mt-button size="large" @click="quitlogin()" class="tcdl">退出当前账号</mt-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      timer: null,
      value:'',
    }
  },
  methods:{
      tomy(){
          this.$router.go(-1);
      },
      autoPlay1(){ 
                    this.$indicator.close();
                    this.$toast('退出成功');
                    this.$router.go(-1);
					},
      play1() { 
					this.timer = setTimeout(this.autoPlay1, 1000) 
					},
      quitlogin(){
          this.$store.state.show2 = false;
          this.$store.state.show1 = true;
          this.$indicator.open();
          this.play1();
      }
  }
  
}
</script>

<style>
.set{
  margin-top: 60px;
}
.set .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
.xxts .mint-cell-title{
  font-size: 12px;
  color: #f22d62;
}
.tysz{
  margin-top: 10px;
}
.tysz .mint-cell-title{
  font-size: 12px;
  color: #f22d62;
}
.tcdl{
  margin: 20px auto;
  width: 30%;
  height: 35px;
  font-size: 12px;
  color: rgb(238, 125, 125);
  background:none;
  border: 1px solid rgb(238, 125, 125);
}
</style>


