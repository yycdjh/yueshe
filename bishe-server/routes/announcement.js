var express = require("express");
var router = express.Router();
var multer = require("multer");
var process = require("process");
//拿到这个表
let Announcement = require("../server/information");
let imagesPath = process.cwd() + "/public/images";



//图片上传
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function(req, file, cb) {
    cb(null, imagesPath);
  },
  //给上传文件重命名，获取添加后缀名
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        fileFormat[fileFormat.length - 1]
    );
  }
});
//添加配置文件到muler对象。
var images = multer({
  storage: storage
});


router.get("/", function(req, res, next) {
  res.render("announcement", {
    user: {
      announcement_title: "",
      announcement_author: "",
      announcement_contents: "",
      announcement_img: "",
      announcement_time:""
    }
  });
});

router.post("/announcement_find", function(req, res, next) {
  let _id = req.body._id;
  
  Announcement.find({ _id: _id }, function(err, announcement) {
    res.send(announcement);
  });
});

router.get("/announcement_list", function(req, res, next) {
  Announcement.find({}, function(err, announcement) {
    res.send(announcement);
  });
});

router.post("/upload", images.single("img"), function(req, res, next) {
  let url = "http://localhost:3000/images/" + req.file.filename;
  let announcement_title = req.body.announcement_title;
  let announcement_contents = req.body.announcement_contents;
  let announcement_author = req.body.announcement_author;
  let announcement_time = req.body.announcement_time;
  let announcement_img = url;


  let json = {
    announcement_title,
    announcement_author,
    announcement_contents,
    announcement_img,
    announcement_time
  };

  Announcement.save(json, function(err, result) {
    if (err) {
      res.render("", {});
      console.log("Error" + err);
    } else {
      console.log("res" + result);
    }
  });
});

router.post("/addannouncement", function(req, res, next) {
  let announcement_title = req.body.announcement_title;
  let announcement_author = req.body.announcement_author;
  let announcement_contents = req.body.announcement_contents;
  let announcement_img = req.body.announcement_img;
  let date  = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  let announcement_time =year +"年" + month + "月" + day + "日";

  console.log(announcement_title);

  let json = {
    announcement_title,
    announcement_author,
    announcement_contents,
    announcement_img,
    announcement_time
  };
  //json,回调
  Announcement.save(json, function(err, result) {
    if (err) {
      res.render("", {});
      console.log("Error" + err);
    } else {
      console.log("res" + result);
    }
  });
});
module.exports = router;