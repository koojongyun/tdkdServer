var express = require('express');
var router = express.Router();
var pg = require('pg');

var conString = "pg://koojongyun:dkssud123@127.0.0.1:5432/postgres";

var client = new pg.Client(conString);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Login */
router.get('/login/:id/:password', function(req, res, next) {
    //res.writeHead(200, {'Content-Type' : 'test/plain'})
    res.render('index', { title: '축하합니다!!!' });

    var data = {text: req.body.text, complete: false};
    client.connect();
    console.log('data.id' + req.params.id);
    console.log('data.password' + req.params.password);
    client.query('SELECT * From tdkd_user WHERE user_id = $1 and password = $2', [req.params.id , req.params.password], function(err, result) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
            throw err;
        }

        console.log(result.rows[0]);
        console.log(req.params.id + ' 로그인 되었습니다.');
        client.end(function (err) {
            if (err) throw err;
        });
    })
});

module.exports = router;
