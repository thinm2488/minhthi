var express = require('express');
var router = express.Router();
var movieController = require('../controller/movieController');
var userController = require('../controller/userController');
var authController = require('../controller/authController');
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path = require('path');


router.post('/', fileUpload(), async function (req, res) {
    try {
        const token = req.session.token || req.headers['x-access-token'];
        await authController.verifyUser(token);
        if (!req.files) {
            req.body.hinh = "img.jpg"
             phim = await movieController.taoPhim(req.body);
           
        } else {
            var file = req.files.hinh;
            req.body.hinh = file.name
            var url = path.join(path.join(__dirname, '../../'), 'public/images/');
            file.mv(url + req.files.hinh.name, async function () {
                phim = await movieController.taoPhim(req.body);
            })
        }
        res.send({
            phim,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});


router.get('/', async function (req, res) {
    try {
        var listphim = await movieController.layPhim();
        res.send({
            listPhimObj: listphim,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})


router.get('/:id', async function (req, res) {
    try {
        var phim = await movieController.layChiTietPhim(req.params.id);

        res.send({
            phim,
    
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }

})


router.put('/', fileUpload(), async function (req, res) {

    try {
       const token=req.session.token||req.headers['x-access-token'];
       await authController.verifyUser(token);
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
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});


router.delete('/:id', async function (req, res) {
    try {
        const token=req.session.token|| req.headers['x-access-token'];
        await authController.verifyUser(token);
        var phim = await movieController.xoaPhim(req.params.id);
        res.send({
            status:200,
            id:req.params.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});


module.exports = router;