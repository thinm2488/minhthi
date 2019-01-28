const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// const generateLink = function (data) {
//     let id = data.id.substr(data.id.length - 5)
//     let convertedlink = common.convertToUsignedChar(data.name)
//     let link = convertedlink.split(' ').join('-') + '-' + id
//     return link
//   }
const verifyUser = async function (token)
 {
    var emailObj = jwt.decode(token);
    let user = await User.findOne({Email: emailObj.data})
    if(user)
    {
        return user;  
    }else{
        throw new Error('Email không tồn tại !')
    }
   
}
// const signUpForSocial = async function (newUser) {
//     try {
//       let user = new User(newUser)
//       user = await user.save()
//       user.userLink = generateLink(user)
//       user = await user.save()
//       let token = jwt.sign({email: user.email}, configs.secret, {
//         expiresIn: configs.expireIn
//       })
//       return responseStatus.Code200({ user: user, token: token })
//     } catch (error) {
//       return error
//     }
//   }

module.exports ={
    verifyUser: verifyUser,
    // signUpForSocial: signUpForSocial
}