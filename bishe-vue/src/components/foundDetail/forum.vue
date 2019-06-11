<template>
  <div class="benyue">
      <el-card class="box-card" v-for="(xiaonei,index) in xiaoneis" :key="index">  
        <div class="text item"  @click="tohtneirong(xiaonei._id)">
          <div class="fxbiaoti">{{xiaonei.communication_name}}</div>
          <div class="fxyonghu">
            <div class="fxkuang">
      <img :src="xiaonei.author_img"  width="15" height="15" />
      </div>
      <div class="fxname">{{xiaonei.author}}</div>
      </div>
      <br>
          <div class="fxcomtents">
             <span class="ffcomtents"> 
              {{xiaonei.summary}}
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
     data () {
    return {
         xiaonei_id:'',
      xiaoneis:[],
    }
  },
  methods:{
     tohtneirong(){
      this.$router.push('/htneirong');
    },
     towenzhang(){
      this.$router.push('/wenzhang');
    },
    tonews(){
      this.$router.push('/news');
    },
    tosearch(){
      this.$router.push('/search');
    },
    tohtneirong(xiaonei_id){
      this.$router.push('/htneirong/'+xiaonei_id);
    },
  },
      mounted: function() {
            var _this = this;
          
    
            _this.$http.post("http://localhost:3000/communication_list/all",{emulateJSON: true})
            .then(
              (response)=>{
                      // console.log(response.data)
                       _this.xiaoneis = response.data.reverse();
                      // console.log(_this.user)
                      
              },
              (error)=>{
            
              }
            );
              }
}
</script>

<style>
.benyue{
    margin-top: 200px;
}
</style>