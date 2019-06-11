<!--轮播图组件 -->
<template>
	<div class="index_swipe">
		
		<mt-swipe 
			:auto="3000" 
			:speed="5"
			:continuous="continuous"
			:showIndicators="showIndicators"
			:prevent="prevent"
			class="index_swipe"
		>
			<!-- <mt-swipe-item class="slide1">
				<img src="/static/img/slide/1.png" alt="" class="images">
			</mt-swipe-item>
			<mt-swipe-item class="slide2">
				<img src="/static/img/slide/2.png" alt="" class="images">
			</mt-swipe-item>
			<mt-swipe-item class="slide3">
				<img src="/static/img/slide/3.png" alt="" class="images">
			</mt-swipe-item> -->
			<mt-swipe-item v-for="(n,index) in announcementlist" :key="index" v-if="index<4"><img :src="n.announcement_img" style="width:100%;height:100%;" @click="ToContents(n._id)"></mt-swipe-item>
		</mt-swipe>
		
	</div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component('mt-swipe', Swipe);
Vue.component('mt-swipe-item', SwipeItem);

export default {
	name: 'index_swipe',
	data () {
		return {
			continuous : true,
			showIndicators : true,
			prevent : true,
			announcementlist:[]
		}
	},
	methods : {
    ToContents(announcement_id) {
      this.$router.push("/announcementcontents/" + announcement_id);
    },
	},
	computed : {
		
	},
	  mounted() {
    var _this = this;
    this.$http
      .get("http://localhost:3000/announcement/announcement_list")
      .then(function(result) {
        // console.log("result", result);
        _this.announcementlist = result.body;
      });
  }
}
</script>

<style>
	/*首页轮播图*/
	.index_swipe {
		width: 100%;
		height: 150px;
		padding : 10;
		background-color: white;
	}
	.images{
		width: 100%;
		
		
	}
	
</style>
