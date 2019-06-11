<template>
    <div>
        <div class="div1">
            <mt-swipe :auto='3000' style="width:100%;height:240px;">
            <mt-swipe-item v-for="(n,index) in announcementlist" :key="index" v-if="index<4"><img :src="n.announcement_img" style="width:100%;height:100%;" @click="ToContents(n._id)"></mt-swipe-item>
            </mt-swipe>
        </div><br>
        <div v-for="(n,index) in announcementlist" class="d2" :key="index" @click="ToContents(n._id)">
            <div class="d3">{{n.announcement_title}}</div><br>
            <div class="d5">{{n.announcement_time}}</div>
            <div class="d4">{{n.announcement_contents}}</div><br>
            <div class="d6"></div>
        </div><br><br><br>
    </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      announcementlist: "",
      time:""
    };
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    ToContents(announcement_id) {
      this.$router.push("/announcementcontents/" + announcement_id);
    },
    ToIndex() {
      this.$router.push("index");
    },
    ToHotel() {
      this.$router.push("hotel");
    },
    ToMyself() {
      this.$router.push("myself");
    },
    ToMarket() {
      this.$router.push("announcement");
    },
    Toaddannouncement() {
      this.$router.push("/addannouncement");
    }
  },
  mounted() {
    var _this = this;
    this.$http
      .get("http://localhost:3000/announcement/announcement_list")
      .then(function(result) {
        console.log("result", result);
        _this.announcementlist = result.body;
      });
  }
};
</script>
<style scoped>
.m1 .mint-button {
  color: black;
}
.m1 {
  background-color: white;
}
.d1 {
  float: left;
}
.d2 {
  text-align: left;
  padding: 10px;
}
.d3{
  font-weight: bold;
}
.d4{
  /* text-indent: 1em; */
  font-size:95%;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
}
.d5{
  float: right;
  font-size: 50%;
}
.d6{
  height:1px;
  width:100%;
  background:#CCCCCC;
  overflow:hidden;
  /* transform: scaleY(0.5); */
}
</style>