<template>
  <div class="guanzhu">
    <div class="xingqu">
        <span>你可能感兴趣的人</span>   
    </div> 
       <div v-show="showTui1">

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/1.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">一个人的旅行</div>  
        <div class="qianming">《头号玩家》话题的活跃回答者</div>
        <div class="abiaoqian">-- 8027觉得有用</div>  
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA1,'class-b':isB1}"  type="primary" @click="toggle1">{{msg1}}</mt-button>
        </div>

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/2.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">两个人的旅行</div>  
        <div class="qianming">《狂暴巨兽》话题的活跃回答者</div>
        <div class="abiaoqian">-- 8227觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA2,'class-b':isB2}"  type="primary" @click="toggle2">{{msg2}}</mt-button>
        </div> 

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/3.png" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">三个人的旅行</div>  
        <div class="qianming">《犬之岛》话题的活跃回答者</div>
        <div class="abiaoqian">-- 3027觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA3,'class-b':isB3}"  type="primary" @click="toggle3">{{msg3}}</mt-button>
        </div>

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/4.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">四个人的旅行</div>  
        <div class="qianming">《湮灭》话题的活跃回答者</div>
        <div class="abiaoqian">-- 6027觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA4,'class-b':isB4}"  type="primary" @click="toggle4">{{msg4}}</mt-button>
        </div> 

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/5.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">五个人的旅行</div>  
        <div class="qianming">《起跑线》话题的活跃回答者</div>
        <div class="abiaoqian">-- 2227觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA5,'class-b':isB5}"  type="primary" @click="toggle5">{{msg5}}</mt-button>
        </div> 

     </div>

       <div v-show="showTui2">

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/01.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">六个人的旅行</div>  
        <div class="qianming">《21克拉》话题的活跃回答者</div>
        <div class="abiaoqian">-- 82027觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA11,'class-b':isB11}"  type="primary" @click="toggle11">{{msg11}}</mt-button>
        </div>

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/02.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">七个人的旅行</div>  
        <div class="qianming">《脱单告急》话题的活跃回答者</div>
        <div class="abiaoqian">-- 8037觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA22,'class-b':isB22}"  type="primary" @click="toggle22">{{msg22}}</mt-button>
        </div> 

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/03.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">八个人的旅行</div>  
        <div class="qianming">《后来的我们》话题的活跃回答者</div>
        <div class="abiaoqian">-- 8237觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA33,'class-b':isB33}"  type="primary" @click="toggle33">{{msg33}}</mt-button>
        </div>

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/04.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">九个人的旅行</div>  
        <div class="qianming">《肖申克的救赎》话题的活跃回答者</div>
        <div class="abiaoqian">-- 1227觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA44,'class-b':isB44}"  type="primary" @click="toggle44">{{msg44}}</mt-button>
        </div> 

        <div class="d1">  
        <div class="d2">  
        <img src="/static/img/zhuanti/05.jpg" class="touxiang" />  
        </div>  
        <div class="atext">   
        <div class="nicheng">十个人的旅行</div>  
        <div class="qianming">《幕后玩家》话题的活跃回答者</div>
        <div class="abiaoqian">-- 2437觉得有用</div>    
        </div>
        <mt-button class="static" v-bind:class="{'class-a':isA55,'class-b':isB55}"  type="primary" @click="toggle55">{{msg55}}</mt-button>
        </div>

     </div>
    <div>
        <mt-button class="huanyipi"  type="default" @click="toggle7">换一批</mt-button>
        <mt-button class="allguanzhu"  type="primary" @click="toggle6"  v-show="showG1">全部关注</mt-button>
        <mt-button class="allguanzhu"  type="primary" @click="toggle66" v-show="showG2">全部关注</mt-button>
    </div>
    <div style="text-align:center;margin-top:70px;">
        没有更多了，去推荐看看吧<br>
        <a>前往推荐</a>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

    </div>


  </div>
</template>

<script>
export default {
    data(){
        return{
              showG1:true,
              showG2:false,
              showTui1:true,
              showTui2:false,
              msg1:"+ 关注",
              msg2:"+ 关注",
              msg3:"+ 关注",
              msg4:"+ 关注",
              msg5:"+ 关注",
              msg11:"+ 关注",
              msg22:"+ 关注",
              msg33:"+ 关注",
              msg44:"+ 关注",
              msg55:"+ 关注",
              isA1:false,
              isA2:false,
              isA3:false,
              isA4:false,
              isA5:false,
              isA11:false,
              isA22:false,
              isA33:false,
              isA44:false,
              isA55:false,
              isB1:true,
              isB2:true,
              isB3:true,
              isB4:true,
              isB5:true,
              isB11:true,
              isB22:true,
              isB33:true,
              isB44:true,
              isB55:true,
        }
    },
    methods:{
        toggle1(){
          
            if( this.msg1 == "+ 关注"){
              this.msg1="已关注";
               this.isA1=true;
            this.isB1=false;
            }else{
                this.msg1 = "+ 关注"
                 this.isA1=false;
            this.isB1=true;
            }
          

        },
        toggle2(){
               if( this.msg2 == "+ 关注"){
              this.msg2="已关注";
               this.isA2=true;
            this.isB2=false;
            }else{
                this.msg2 = "+ 关注"
                 this.isA2=false;
            this.isB2=true;
            }
        },
        toggle3(){
              if( this.msg3 == "+ 关注"){
              this.msg3="已关注";
               this.isA3=true;
            this.isB3=false;
            }else{
                this.msg3 = "+ 关注"
                 this.isA3=false;
            this.isB3=true;
            }

        },
        toggle4(){
            if( this.msg4 == "+ 关注"){
              this.msg4="已关注";
               this.isA4=true;
            this.isB4=false;
            }else{
                this.msg4 = "+ 关注"
                 this.isA4 = false;
            this.isB4 = true;
            }

        },
        toggle5(){
            if( this.msg5 == "+ 关注"){
              this.msg5="已关注";
               this.isA5=true;
            this.isB5=false;
            }else{
                this.msg5 = "+ 关注"
                 this.isA5=false;
            this.isB5=true;
            }

        },
        toggle11(){
          
            if( this.msg11 == "+ 关注"){
              this.msg11="已关注";
               this.isA11=true;
            this.isB11=false;
            }else{
                this.msg11 = "+ 关注"
                 this.isA11=false;
            this.isB11=true;
            }
          

        },
        toggle22(){
               if( this.msg22 == "+ 关注"){
              this.msg22="已关注";
               this.isA22=true;
            this.isB22=false;
            }else{
                this.msg22 = "+ 关注"
                 this.isA22=false;
            this.isB22=true;
            }
        },
        toggle33(){
              if( this.msg33 == "+ 关注"){
              this.msg33="已关注";
               this.isA33=true;
            this.isB33=false;
            }else{
                this.msg33 = "+ 关注"
                 this.isA33=false;
            this.isB33=true;
            }

        },
        toggle44(){
            if( this.msg44 == "+ 关注"){
              this.msg44="已关注";
               this.isA44=true;
            this.isB44=false;
            }else{
                this.msg44 = "+ 关注"
                 this.isA44 = false;
            this.isB44 = true;
            }

        },
        toggle55(){
            if( this.msg55 == "+ 关注"){
              this.msg55="已关注";
               this.isA55=true;
            this.isB55=false;
            }else{
                this.msg55 = "+ 关注"
                 this.isA55=false;
            this.isB55=true;
            }

        },
        toggle6(){
           
            this.msg1="已关注";
            this.isA1=true;
            this.isB1=false;

     
       
            this.msg2="已关注";
            this.isA2=true;
            this.isB2=false; 

    
       
            this.msg3="已关注";
            this.isA3=true;
            this.isB3=false; 

      
  
            this.msg4="已关注";
            this.isA4=true;
            this.isB4=false;

        
            this.msg5="已关注";
            this.isA5=true;
            this.isB5=false;

        },
          toggle66(){
           
            this.msg11="已关注";
            this.isA11=true;
            this.isB11=false;

     
       
            this.msg22="已关注";
            this.isA22=true;
            this.isB22=false; 

    
       
            this.msg33="已关注";
            this.isA33=true;
            this.isB33=false; 

      
  
            this.msg44="已关注";
            this.isA44=true;
            this.isB44=false;

        
            this.msg55="已关注";
            this.isA55=true;
            this.isB55=false;

        },
        toggle7(){
             if(this.showTui1){
                  this.showTui1=false;
                  this.showTui2=true;
                  this.showG1=false;
                  this.showG2=true;
             }else{
                  this.showTui1=true,
                  this.showTui2=false;
                  this.showG1=true;
                  this.showG2=false;
             }
        }

    }

}
</script>

<style>
.guanzhu{
  margin-top: 60px;
}
.xingqu{
    background-color:white;
    margin-top: 23px;
    height: 60px;
}
.xingqu span{
    line-height: 50px;
    margin-left: 10px;
    font-weight: bold;
}
.static{
    height: 30px;
    font-size: 13px;
    margin-top: 23px;
    float: right;
    margin-right: 25px;
}
.class-a{
    background-color: #8b98ee;


}
.class-b{

    background-color: rgb(240, 240, 240);
    color: #8b98ee;


}
.huanyipi{
    float: left;
    margin-top: 10px;
    margin-left: 40px;
    width: 35%;
    height: 30px;
    border:1px solid rgb(0, 0, 0);
    font-size: 13px;
    
}
.allguanzhu{
    float: right;
    margin-top: 10px;
    margin-right: 40px;
    width: 35%;
    height: 30px;
    border:1px solid rgb(0, 0, 0);
    font-size: 13px;
}

.d1{
    width:100%; 
    height:75px;
    padding-left:10px; 
    padding-top:10px; 
    background-color: white;
    border-bottom: 1px solid rgb(238, 238, 238);
  }
  .d2{
    width: 50px; 
    height: 50px; 
    float:left; 
    border-radius: 50%; 
    border: 2px solid #eee; 
    overflow: hidden;
  }
  .atext{
   float:left; 
   margin-left:20px; 
   color:black;
   
 }
 .touxiang{
   width:50px;
   height: 50px;
 }
  .nicheng{
    font-size: 15px;
    margin-top: 10px;
    font-weight: bold;
  }
  .qianming{
    font-size: 12px;
    margin-top: 3px;
  }
  .abiaoqian{
    font-size: 10px;
    color: gray;
    margin-top: 5px;
  }
</style>