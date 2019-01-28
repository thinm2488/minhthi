var express = require('express');
var session = require('express-session')
var router = express.Router();
var userController = require('../controller/userController');
// var authController = require('../controller/authController');
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path = require('path');
// var passport = require('../controller/passport').passport

router.get('/profile', async function (req, res) {
    try {
        var token = req.session.token;
        var emailObj = jwt.decode(token);
        var userInfomation = await userController.getUserByEmail(emailObj.data)
        res.send({
            status: 200,
            userInfomation,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })

    }
})


router.get('/logout', async function (req, res) {
    try {
        req.session.destroy();
        res.send({
            status:200,
            mess: 'LogOut Thành công'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })

    }

})

router.post('/signup', async function (req, res) {
    try {
        //? lai con de x-acess-token vao khong
        var token = jwt.sign({ data: req.body.Email }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        var user = await userController.taoUser(req.body);
        user = JSON.parse(JSON.stringify(user))
        delete user.password;
        res.send({
            token,
            user
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

        res.send({
            token:token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});

router.put('/', fileUpload(), async function (req, res) {

    try {
        var token = jwt.sign({ data: req.body.Email }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
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
router.put('/password', async function (req, res) {
    try {
        var token = jwt.sign({ data: req.body.Email }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        user = await userController.changePass(req.body);
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.put('/passwordReset',async function(req,res){
    try {
        var token = jwt.sign({ data: req.body.Email }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        user= await userController.resetPassword(req.body,req.headers.host)

        res.send(user);
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.put('/resetpassword/:token',async function(req,res){
    var email=jwt.decode(req.params.token);
    user= await userController.changePassword(email.Email)
    res.send(user);
})
// router.get('/google', passport.authController('google', { scope:
//     [ 'https://www.googleapis.com/user/userinfo.email',
//       'https://www.googleapis.com/user/userinfo.profile' ] }))
//   router.get('/google/callback', function (req, res, next) {
//     passport.authenticate('google', function (err, user, info) {
//       if (err) {
//         return res.send({ errorMessage: err })
//       }
//       res.render('cinema/home', { title: 'Home', token: info.token })
//     })(req, res, next)
//   })


module.exports = router;

