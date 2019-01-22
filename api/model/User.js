var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
    {
        tenNguoiDung: { type: String },
        Email: { type: String },
        password: { type: String },
        hinh:{type:String,}
        

    }
);
module.exports=mongoose.model('User',UserSchema)



