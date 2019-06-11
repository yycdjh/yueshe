<template>
    <div>
        <mt-header class="m1" style="background:#ffffff;border-bottom:1px solid #CFCFCF"><mt-button icon="back" slot="left" @click="back()"></mt-button></mt-header>
        <div class="d0">
        <div class="d1"><h3>{{information.information_title}}</h3></div><br>
        <div class="d2"><img :src="information.information_img" style="width:100%; height:200px"></div><br>
        <div class="d3">{{information.information_contents}}</div><br><br>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      information: [],

    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
    var _this = this;
    var _id = _this.$route.params.information_id;
    console.log( _this.$route.params.information_id)
    _this.$http
      .post(
        _this.baseUrl+"/information_list/information_find",
        { _id: _id },
        { emulateJSON: true }
      )
      .then(
        response => {
          console.log("response",response);
          _this.information = response.data[0];
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