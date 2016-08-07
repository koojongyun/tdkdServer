var express = require('express');
var router = express.Router();
var db = require('../queries/login.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Login */
router.get('/login/:id/:password', db.getLogin);


/* Check Duplicate Id */
router.get('/login/register/duplicate/:id', db.getDuplicationCheck);

/* CREATE Member Register */


module.exports = router;
