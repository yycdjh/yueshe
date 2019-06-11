<template>
  <div class="tabbar">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item v-for="(item,tab) in items" :id="item.id" :key="tab" v-on:click="makeActive()" >
      <img slot="icon" :src="item.item_img">
      {{item.name}}
      </mt-tab-item>
    </mt-tabbar>
  <router-view> 
  </router-view>
  </div>
</template>

<script>
export default {
data () {
return {
value: '', 
selected:this.selected,
items: [
{name: '首页',id:'1',item_img:"/static/img/icon/home1.png"},
{name: '资讯',id:'2',item_img:"/static/img/icon/movie2.png"},
{name: '约设',id:'3',item_img:"/static/img/icon/+.png"},
{name: '发现',id:'4',item_img:"/static/img/icon/found2.png"},
{name: '我的',id:'5',item_img:"/static/img/icon/my2.png"},
],

}
},
computed: {
otherSelect () {
return this.$store.state.selectTab
}
},
watch: {
selected: function (val, oldVal) {
// 这里就可以通过 val 的值变更来确定
if(val==1){
this.items[0].item_img="static/img/icon/home1.png"
this.$router.push('/index');
}else{
this.items[0].item_img="static/img/icon/home2.png"
}

if(val==2){
this.items[1].item_img="static/img/icon/movie1.png"
this.$router.push('/information');
}else{
this.items[1].item_img="static/img/icon/movie2.png"
}

if(val==3){
this.$router.push('/release');
}

if(val==4){
this.items[3].item_img="static/img/icon/found1.png"
this.$router.push('/find');
}else{
this.items[3].item_img="static/img/icon/found2.png"
}

if(val==5){
this.items[4].item_img="static/img/icon/my1.png"
this.$router.push('/my');
}else{
this.items[4].item_img="static/img/icon/my2.png"
}

}
},
mounted(){
  if(this.$route.path == "/index"){
     this.selected=1
  }
  if(this.$route.path == "/information"){
     this.selected=2
  }
  if(this.$route.path == "/release"){
     this.selected=3
  }
  if(this.$route.path == "/find"){
     this.selected=4
  }
  if(this.$route.path == "/my"){
     this.selected=5
  }

  
}




}
</script>

<style>

</style>


