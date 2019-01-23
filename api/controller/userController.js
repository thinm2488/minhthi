
const mongoose = require('mongoose');
const User = mongoose.model('User');

const taoUser = async function (data) {
    let user = await User.findOne({ Email: data.Email });
    if (user) {
        throw new Error('Email đã được sử dụng ! ')
    }
  
    // if(Email)
    // {
    //     window.alert('Email đã được sử dụng!')
    // }else{
    //     var user=new User(data);
    //     await user.save();
    //     return{
    //         user
    //     }
    // }
    user = new User(data);
    await user.save();
    return {
        user
    }

}

const getUserByEmail = async function (email) {
    let user = await User.findOne({ Email: email });
    return user;

}



const checkLogin = async function (data) {
    let user = await User.findOne({ Email: data.Email });
    if (user) {
        if (user.password === data.password) {
            return true

        }
        else {
            return false
        }

    }
    else {
        return false
    }
}
const editProfile = async function (data) {
    let user = await User.findOne({ Email: data.Email });
    
        user.Email=data.Email;
        user.tenNguoiDung=data.tenNguoiDung;
        if(data.hinh){
        user.hinh=data.hinh;
        }
    
    await user.save();
    return {
        user
    }

}



module.exports = {
    taoUser: taoUser,
    getUserByEmail: getUserByEmail,
    checkLogin: checkLogin,
    editProfile:editProfile,
  
}


