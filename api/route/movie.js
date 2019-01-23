var express = require('express');
var router = express.Router();
var movieController = require('../controller/movieController');
var userController = require('../controller/userController');
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path = require('path');


router.post('/', fileUpload(), async function (req, res) {
    try {


        if (!req.files) {
            req.body.hinh = "img.jpg"
            var phim = await movieController.taoPhim(req.body);
            var token = req.session.token;
            if (token) {
                var emailObj = jwt.decode(token);
                var user = await userController.getUserByEmail(emailObj.data);
                checkLogin = true;
            }

        } else {
            var file = req.files.hinh;

            req.body.hinh = file.name
            var url = path.join(path.join(__dirname, '../../'), 'public/images/');

            file.mv(url + req.files.hinh.name, async function () {
                var phim = await movieController.taoPhim(req.body);
                var token = req.session.token;
                if (token) {
                    var emailObj = jwt.decode(token);
                    var user = await userController.getUserByEmail(emailObj.data);
                    checkLogin = true;
                }

            })
        }

        res.send({
            phim,
            user: user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }


});

router.get('/', async function (req, res) {
    try {
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
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }

})

router.post('/detail', async function (req, res) {
    try {
        var phim = await movieController.layChiTietPhim(req.body.id);
        var checkLogin = false;
        var token = req.session.token;
        if (token) {
            var emailObj = jwt.decode(token);
            var user = await userController.getUserByEmail(emailObj.data);
            checkLogin = true;
        }
        res.send({
            phim,
            checkLogin: checkLogin,
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }

})
router.put('/', fileUpload(), async function (req, res) {

    try {
        var phim;

        if (!req.files) {
            // req.body.hinh = "img.jpg"
            phim = await movieController.suaPhim(req.body);
          
        } else {
            var file = req.files.hinh;

            req.body.hinh = file.name
            var url = path.join(path.join(__dirname, '../../'), 'public/images/');

            file.mv(url + req.files.hinh.name, async function () {
                phim = await movieController.suaPhim(req.body);
              

            })
        }

        res.send({
            phim,
            user: user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }

});
router.post('/xoadetail', async function (req, res) {
    try {
        var phim = await movieController.xoaPhim(req.body.id);
        var checkLogin = false;
        var token = req.session.token;
        if (token) {
            var emailObj = jwt.decode(token);
            var user = await userController.getUserByEmail(emailObj.data);
            checkLogin = true;
        }

        res.send({

            checkLogin: checkLogin,
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })

    }
});


module.exports = router;