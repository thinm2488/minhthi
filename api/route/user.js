var express = require('express');
var session = require('express-session')
var router = express.Router();
var userController = require('../controller/userController');
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path = require('path');

router.get('/profile', async function (req, res) {
    try {
        var token = req.session.token;
        var emailObj = jwt.decode(token);
        var userInfomation = await userController.getUserByEmail(emailObj.data)

        res.send({
            userInfomation,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })

    }
})

router.get('/', async function (req, res) {
    try {
        req.session.destroy();
        res.send({
            mess: 'LogOut Thành công'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })

    }

})

router.post('/', async function (req, res) {
    try {

        var token = jwt.sign({ data: req.body.Email }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        var user = await userController.taoUser(req.body);

        res.send({
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }


});

router.post('/signin', async function (req, res) {
    try {
        var token = jwt.sign({ data: req.body.Email }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        var user = await userController.checkLogin(req.body);

        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});

router.put('/', fileUpload(), async function (req, res) {

    try {
        var user
        if (!req.files) {
            user = await userController.editProfile(req.body);
        }
        else {
            var file = req.files.hinh;
            req.body.hinh = file.name;
            var url = path.join(path.join(__dirname, '../../'), 'public/images/');
            file.mv(url + req.files.hinh.name, async function () {
                user = await userController.editProfile(req.body);

            })

        }
        res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.put('/changepass', async function (req, res) {
    try {
        user = await userController.changePass(req.body);
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});


module.exports = router;

