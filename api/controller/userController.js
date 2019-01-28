
const mongoose = require('mongoose');
const User = mongoose.model('User');
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const smtpTransport=require('nodemailer-smtp-transport')
var generator=require('generate-password')

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

        } else {

            throw new Error('Nhập sai Email hoặc password!')
        }
    } else {
        throw new Error('Email không tồn tại!')
    }

}
const editProfile = async function (data) {
    let user = await User.findOne({ Email: data.Email });

    user.Email = data.Email;
    if (data.tenNguoiDung) {
        user.tenNguoiDung = data.tenNguoiDung;
    }
    if (data.hinh) {
        user.hinh = data.hinh;
    }

    await user.save();
    return { user }

}
const changePass = async function (data) {
    let user = await User.findOne({ Email: data.Email });



    if (user.password === data.oldPassword) {
        user.password = data.newPassword
    }
    else {
        throw new Error('Nhập sai mật khẩu cũ!')
    }
    await user.save();
    return { user }

}

const resetPassword = async function (data,host) {
    let user = await User.findOne({ Email: data.Email });
    if (!user) {
        throw new Error('Người dùng không tồn tại!')
    }
    var token = jwt.sign({ Email: data.Email }, "secret")
    var transPorter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        auth: {
            user: "cinemaproject19@gmail.com",
            pass: "cinemaproject2019"
        }
    }))
    var mailOption = {
        from: "cinemaproject19@gmail.com",
        to: data.Email,
        subject: "Reset Password",
        text: "Nhấp vào đường link để thay đổi mật khẩu:\n" + "http://" + host + "/user/resetpassword/" + token
    }
    console.log(mailOption)
return transPorter.sendMail(mailOption);
}
const changePassword = async function (data) {
    let user = await User.findOne({ Email: data });

    var newpass= generator.generate({
        length:8,
        Number:true
    })
    user.password=newpass;

    
    await user.save();
    return { user, newpass }

}




module.exports = {
    taoUser: taoUser,
    getUserByEmail: getUserByEmail,
    checkLogin: checkLogin,
    editProfile: editProfile,
    changePass: changePass,
    resetPassword: resetPassword,
    changePassword:changePassword
}


