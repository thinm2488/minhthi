
const mongoose = require('mongoose');
const User = mongoose.model('User');

const taoUser =async function(data){
    var user=new User(data);
    await user.save();
    return{
        user:user
    }
}
module.exports={
   taoUser:taoUser
}


