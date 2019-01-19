var express= require('express');
var session=require('express-session')
var router=express.Router();
var userController=require('../controller/userController');
var jwt=require('jsonwebtoken');

router.post('/',async function(req,res){

 var token =jwt.sign({data: req.body.Email}, 'secret', { expiresIn: '1y' });
 req.session.token = token;
 var user = await userController.taoUser(req.body);

 res.send(user)

});
router.get('/', async function(req,res){
    req.session.destroy();
    res.send({
        mess: 'LogOut Thành công'
    })
})
router.post('/login',async function(req,res){

    var token =jwt.sign({data: req.body.Email}, 'secret', { expiresIn: '1y' });
    req.session.token = token;
    var check = await userController.checkLogin(req.body);
   
    res.send(check)
   
   });


module.exports=router;

