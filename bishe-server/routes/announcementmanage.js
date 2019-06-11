var express = require("express");
var router = express.Router();

let Announcement = require("../server/information");
/* GET users listing. */
router.get("/", function(req, res, next) {
  Announcement.find({}, function(err, announcement) {
    res.render("announcementmanage", { announcement });
  });
});

router.post("/delete", function(req, res) {
  let _id = req.body.announcementId;
  console.log(_id);
  Announcement.remove({ _id: _id }, function(err) {
    let response = {};
    if (err) {
      response["status"] = "error";
      console.log(err);
      throw err;
    } else {
      response["status"] = "ok";
      res.send(response);
    }
  });
});
module.exports = router;
