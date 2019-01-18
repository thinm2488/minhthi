var express = require('express');
var router = express.Router();
var movieController = require('../controller/movieController');
var userController = require('../controller/userController');
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path= require('path');


router.post('/', fileUpload(), async function (req, res) {

    var file = req.files.hinh;

    req.body.hinh = file.name;
    // luu file
    var url=path.join(path.join(__dirname, '../../'),'public/images/');
    
    file.mv(url + req.files.hinh.name , async function () {
        var phim = await movieController.taoPhim(req.body);
        res.send({
            phim: phim
        })
    })

});

router.get('/', async function (req, res) {
    var listphim = await movieController.layPhim();
    var checkLogin = false;
    var token = req.session.token;
    if (token) {
        var emailObj = jwt.decode(token);
        var user = await userController.getUserByEmail(emailObj.data);
        checkLogin = true;
    }
    res.send({
        listPhimObj: listphim,
        checkLogin: checkLogin,
        user: user
    })
})

router.post('/detail', async function (req, res) {
    var phim = await movieController.layChiTietPhim(req.body.id);
    res.send({
        phim: phim
    })
})

module.exports = router;