
const mongoose = require('mongoose');
const User = mongoose.model('User');

const taoUser =async function(data){
    var user=new User(data);
    await user.save();
    return{
        user
    }
}

const getUserByEmail = async function(email){
    let user= await User.findOne({Email:email});
    return   user;
    
}


const checkLogin = async function(data){
    let user = await User.findOne({Email:data.Email});
    if(user){
        if(user.password===data.password){
        return true

        } 
        else{
            return false
        }

    }
    else{
        return false
    }
}




module.exports={
   taoUser:taoUser,
   getUserByEmail:getUserByEmail,
   checkLogin:checkLogin
}


