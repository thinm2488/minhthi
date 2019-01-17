var express= require('express');
var router=express.Router();
var userController=require('../controller/userController');

router.post('/',async function(req,res){
 var user = await userController.taoUser(req.body);
 res.send({
     user:user
 })
});

module.exports=router;

