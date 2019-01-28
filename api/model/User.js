var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
    {
        tenNguoiDung: { type: String },
        Email: { type: String },
        password: { type: String },
        hinh:{type:String,default:"user.png"}
        

    }
);
module.exports=mongoose.model('User',UserSchema)



