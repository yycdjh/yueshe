<template>
  <div id="app">
     <router-view name="tabbar" style="z-index:10000"> 
     </router-view>
      <router-view > 
     </router-view>
  </div>
</template>

<script>
  export default {
  name: 'app',
    created(){
    let id = sessionStorage.getItem('id');
    let user = sessionStorage.getItem('user');
    let user_img = sessionStorage.getItem('user_img');
    let user_name = sessionStorage.getItem('user_name');
    if(!user){
      //跳去登陆
      this.$router.push('/index');
    }else{
      //
      console.log("user",user);
    
      this.$store.state.id =id;
      this.$store.state.user =user;
      this.$store.state.user_img =user_img;
      this.$store.state.user_name =user_name;
      this.$store.state.show1 = false;
      this.$store.state.show2 = true;
    }
  },
  data () {
    return {
    }
  },
  mounted(){
// this.$router.push('/home'); 
  
},
watch:{
            '$route':function(to,from){
　　　　　　　　　　 document.body.scrollTop = 0;
                 document.documentElement.scrollTop = 0;
           }

        }
}
</script>

<style>
body{
  margin:0;
  background: rgb(250, 250, 250);

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
  font-size: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
