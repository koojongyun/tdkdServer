var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login/:id/:password', function(req, res, next) {
  res.render('index', { title: '축하합니다!!!' });
});


module.exports = router;
