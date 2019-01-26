
const mongoose = require('mongoose');
const User = mongoose.model('User');

const taoUser = async function (data) {
    let user = await User.findOne({ Email: data.Email });
    if (user) {
        throw new Error('Email đã được sử dụng ! ')
    }
  
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
            return user

        }else{
            
            throw new Error('Nhập sai Email hoặc password!')
        }      
    }else{
        throw new Error('Email không tồn tại!')
    }
 
}
const editProfile = async function (data) {
    let user = await User.findOne({ Email: data.Email });
    
        user.Email=data.Email;
        if(data.tenNguoiDung){
        user.tenNguoiDung=data.tenNguoiDung;
        }
        if(data.hinh){
        user.hinh=data.hinh;
        }
    
    await user.save();
    return {user}

}
const changePass=async function(data){
    let user = await User.findOne({ Email: data.Email });
  
  
    
        if (user.password === data.oldPassword) {
            user.password=data.newPassword
        }
        else {
            throw new Error('Nhập sai mật khẩu cũ!')
        }
        await user.save();
        return {user}

    }
    



module.exports = {
    taoUser: taoUser,
    getUserByEmail: getUserByEmail,
    checkLogin: checkLogin,
    editProfile:editProfile,
    changePass:changePass
}


