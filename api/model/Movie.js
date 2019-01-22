var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MovieSchema = new Schema(
    {
        tenPhim: { type: String },
        theLoai: { type: String },
        phatHanh: { type: Number },
        moTa: { type: String },
        hinh:{type:String},
        ngayTao:{type: Number, default: Date.now()},
        nguoiTao:{type:String}
        
        

    }
);

module.exports = mongoose.model('Phim', MovieSchema);