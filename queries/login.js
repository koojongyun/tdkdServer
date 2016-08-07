var pg = require('pg');
var conString = "pg://koojongyun:dkssud123@127.0.0.1:5432/postgres";

module.exports = {
    getLogin: getLogin,
    getDuplicationCheck : getDuplicationCheck
};

function getLogin(req, res, next) {
    var client = new pg.Client(conString);
    client.connect();
    client.query('SELECT * From tdkd_user WHERE user_id = $1 and password = $2', [req.params.id , req.params.password], function(err, result) {
        res.writeHead(200, {"Content-Type": "application/json"});
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
            throw err;
        }
        if (result.rows.length > 0) {
            console.log(req.params.id + ' 로그인 되었습니다.');
            var obj = JSON.stringify({
                userId : result.rows[0].user_id,
                password : result.rows[0].password,
                result : 'PASS'
            });

            res.end(obj);
        } else {
            console.log(req.params.id + ' 의 ID와 PASSWORD를 확인해 주십시오.');
            var obj = JSON.stringify({
                userId : req.params.id,
                password :  req.params.password,
                result : 'FAIL'
            });
        }
        client.end(function (err) {
            if (err) throw err;
        });
    })
}

function getDuplicationCheck(req, res, next) {
    var client = new pg.Client(conString);
    client.connect();
    client.query("SELECT user_id From tdkd_user WHERE user_id = $1 and use_yn = 'Y'", [req.params.id], function(err, result) {
        res.writeHead(200, {"Content-Type": "application/json"});
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({success: false, data: err});
                throw err;
            }
            if (result.rows.length == 0) {
                console.log(req.params.id + ' 존재하지 않는 계정입니다.');
                var obj = JSON.stringify('UNI');
            } else {
                console.log(req.params.id + ' 이미 존재하는 계정입니다.');
                var obj = JSON.stringify('DUP');
            }
            res.end(obj);
            client.end(function (err) {
                if (err) throw err;
            });
    })
}