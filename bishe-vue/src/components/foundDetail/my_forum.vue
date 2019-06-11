<template>
  <div class="jinri">
<div v-if="communications.length ==0" style="text-align: center;font-sise:20px;margin-top:15px;">暂无帖子</div>
<el-card class="box-card" v-for="(communication,index) in communications" :key="index">  
        <div class="text item"  @click="tohtneirong(communication._id)">
          <div class="fxbiaoti">{{communication.communication_name}}</div>
          <div class="fxyonghu">
            <div class="fxkuang">
      <img :src="communication.author_img"  width="15" height="15" />
      </div>
      <div class="fxname">{{communication.author}}</div>
      </div>
      <br>
          <div class="fxcomtents">
             <span class="ffcomtents"> 
              {{communication.summary}}
               </span>
          </div>  
          <div class="fxredu">
                292万热度
          </div> 
        </div>
      </el-card>

     <br/>  <br/>  <br/>  <br/>
  </div>
</template>

<script>
export default {
  
  data(){
    return {
      xiaonei_id:'',
      communications:[],
    }
   },
   methods:{
    towenzhang(){
      this.$router.push('/wenzhang');
    },
    tonews(){
      this.$router.push('/news');
    },
    tosearch(){
      this.$router.push('/search');
    },
    tohtneirong(communication_id){
      this.$router.push('/htneirong/'+communication_id);
    },
    },
    mounted: function() {
            var _this = this;
            var author_id = _this.$store.state.id;
    
            _this.$http.post("http://localhost:3000/communication_list/user_all",{author_id:author_id},{emulateJSON: true})
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
.jinri{
    margin-top: 200px;
}
</style>