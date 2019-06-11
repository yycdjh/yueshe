<template>
<div class="options">

        <div  v-on:click="tozhuye(this.user_id)">
        <mt-cell title="我的主页" style="margin-top:20px;border-bottom: 1px solid rgb(218, 218, 218);" is-link> 
           <img slot="icon" src="/static/img/icon/签到.png" width="24" height="24">
        </mt-cell>          
        </div>
        <div  v-on:click="totask(this.user_id)">
        <mt-cell title="我的任务" style="border-bottom: 1px solid rgb(218, 218, 218);" is-link>
            <img slot="icon" src="/static/img/icon/钱包.png" width="24" height="24">
        </mt-cell>  
        </div>
        <div>
        <mt-cell title="设置" style="border-bottom: 1px solid rgb(218, 218, 218);" to="/set" is-link>
           <img slot="icon" src="/static/img/icon/设置.png" width="24" height="24">
        </mt-cell>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
     
    }
  },
    methods:{
        tozhuye(user_id){
          user_id = this.$store.state.id,
      this.$router.push('/show/'+user_id);
    },
       totask(user_id){
          user_id = this.$store.state.id,
      this.$router.push('/task_list/'+user_id);
    },
    }
}
</script>

<style>
.options .mint-cell img{
      margin-right: 20px;
}
</style>


