<template>
<div class="search">
    <mt-header fixed>
      <mt-field  placeholder="搜索"   v-model="communication_name" slot="right" class="ksearch">
        <mt-button icon="search" v-on:click="tosearch()"></mt-button>
      </mt-field>
      <mt-button icon="back" slot="left" v-on:click="backtoup()"></mt-button>
  </mt-header>

  <div>
    <mt-cell class="scell" title=" 热门专题" is-link>
      <i class="el-icon-menu" slot="icon"></i>
    </mt-cell>
    <div  v-for="(communication,index) in communications" :key="index" v-on:click="tocommunication(communication._id)">
      <mt-cell :title="communication.communication_name" is-link>
      </mt-cell>
    </div>
    <div class="qingkong">清空搜索记录</div>

  </div>

</div>
</template>

<script>
export default {
     data () {
    return {
      selected:"1",
      communication_name:'',
      communications:'',
    }
  },
  methods:{
      backtoup(){
        this.$router.go(-1)
      },
      tocommunication(communication_id){
        this.$router.push('/htneirong/'+communication_id);
      },
      tosearch(){
        var _this = this;
        var communication_name = _this.communication_name
        _this.$http
        .post(_this.baseUrl+"/communication_list/findcommunication",
        {communication_name:communication_name},
        {emulateJSON: true})
        .then(
          (response)=>{
            console.log(response.data); 
            _this.communications = response.data.resultList;
          },
          (error)=>{
            this.$Message.error('查不到相关帖子');
            // console.log(error);
          }
        );
      }
  }
}
</script>

<style>
.search{
  margin-top: 60px;
}
.search .mint-header{
  height: 50px;
  background-color:white;
  color:rgb(100, 100, 100);
  border-bottom: 1px solid rgb(218, 218, 218);
}
.ksearch{
  width: 350px;
}
.scell{
  border: 1px solid rgb(245, 245, 245);
}
.aremen{
  padding: 15px;
  border: 1px solid rgb(245, 245, 245);
  background: white;
  display: inline-block;

}
.remen{
  padding: 4px;
  border: 1px solid rgb(169, 169, 169);
  float: left;
  margin: 0 10px 10px 10px;
  border-radius: 3px;
  color: rgb(122, 122, 122);
  font-size: 14px;
}
.qingkong{
    padding: 10px;
    border: 1px solid rgb(245, 245, 245);
    text-align: center;
    background: white;
    font-size: 13px;
    color:gray;
}
</style>