<template>
    <div>
        <mt-header class="m1"><mt-button icon="back" slot="left" @click="back()"></mt-button></mt-header>
        <div class="d0">
        <div class="d1"><h3>{{list.announcement_title}}</h3></div><br>
        <div class="d2"><img :src="list.announcement_img" style="width:100%; height:200px"></div><br>
        <div class="d3">{{list.announcement_contents}}</div><br><br>
        <div class="d4">{{list.announcement_time}}</div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      list: [],

    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
    var _this = this;
    var _id = _this.$route.params.announcement_id;
    _this.$http
      .post(
        "http://localhost:3000/announcement/announcement_find",
        { _id: _id },
        { emulateJSON: true }
      )
      .then(
        response => {
          console.log("response",response);
          _this.list = response.data[0];
          console.log("list",_this.list);
        },
        error => {}
      );
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
.d0 {
  margin: 20px;
}
.d1 {
  text-align: center;
}
.d2 {
  text-align: center;
}
.d3 {
  text-align: left;
  text-indent: 2em;
}
.d4{
  font-size: 60%;
  position:fixed;
  bottom: 5%;
  right: 10%;
}
</style>