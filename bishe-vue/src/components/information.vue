<template>
  <div class="information">
    <mt-swipe class="swipe-wrap" :auto="4000">
      <mt-swipe-item class="swipe-item">
        <img class="swipe-img" src="/static/img/slide/1.png" alt="">
      </mt-swipe-item>
      <mt-swipe-item class="swipe-item">
        <img class="swipe-img" src="/static/img/slide/1.png" alt="">
      </mt-swipe-item>
      <mt-swipe-item class="swipe-item">
        <img class="swipe-img" src="/static/img/slide/1.png" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <mt-navbar class="navbar-title"  :class="{ active: isActive }">
      <mt-tab-item>热门资讯</mt-tab-item>
    </mt-navbar>
    <div class="information-content" :class="{ active: isActive }">
      <div class="information-cell"  v-for="(information,index) in informations" :key="index" @click="toInformationDetail(information._id)">
        <div class="left-text">
          <div class="text-title">{{information.information_contents}}</div>
        </div>
        <div class="right-image">
          <img :src="information.information_img" alt="">
        </div>
        <div class="content-foot">
          <span>坤坤日报</span>
          <span class="foot-text">1.5w评</span>
          <span class="foot-text">3小时前</span>
          <img class="foot-image" src="/static/img/icon/close.png" alt="" @click.stop="onClose">
        </div>
      </div>





    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      informations:[],
    }
  },
  methods: {
    onHandleScroll() {
      //var headerTop = document.getElementById('headerTop')
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 200) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    onClose() {
      this.$messagebox.confirm('确定删除吗?').then(action => {
        
      });
    },
    toInformationDetail(information_id) {
      this.$router.push('/information_tcontents/'+information_id)
    }
  },
  mounted: function() {
    var _this = this;
    _this.$http
    .get(_this.baseUrl+"/information_list/all",{emulateJSON: true})
    .then(
      (response)=>{
        _this.informations = response.data.reverse();       
      },
      (error)=>{
      }
    );
    window.addEventListener('scroll', this.onHandleScroll)
      }
    

}
</script>

<style>
.swipe-wrap {
  height: 200px;
}
.swipe-img {
  width: 100%;
  height: 100%;
}
.navbar-title {
   width: 100%;
}
.navbar-title.active {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
.information .mint-tab-item-label {
  font-size: 12px;
}
.information-content {
  padding: 0 12px;
}
.information-content.active {
  position: absolute;
  margin-top: 50px;
  padding: 0 12px;
}
.information-cell {
  padding: 10px 0;
  border-bottom: 1px solid rgb(221, 221, 221);
}
/* 左边文本 */
.left-text {
  width: 60%;
  height: 90px;
  display: inline-block;
}
.text-title {
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
/* 右边图片 */
.right-image {
  width: 36%;
  height: 90px;
  position: relative;
  float: right;
  border-radius: 5px;
  overflow: hidden;
}
.right-image img {
  width: 120%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* 底部信息 */
.content-foot {
  margin-top: 5px;
  position: relative;
}
.foot-text {
  margin-left: 8px;
}
.foot-image {
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
