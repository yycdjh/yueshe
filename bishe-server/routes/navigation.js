var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('navigation', { title: '后台管理系统' });
});

module.exports = router;
