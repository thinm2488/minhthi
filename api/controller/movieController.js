const mongoose = require('mongoose');
const Phim = mongoose.model('Phim');


const taoPhim = async function (data) {
    var phim = new Phim(data);
    await phim.save();
    return {
        phim
    };

}

const layPhim = async function () {//sort ngay ngan nhat
    var listphim = await Phim.find().sort({"ngayTao":-1});
    return {
        listphim
    }

}

const layChiTietPhim = async function (id) {
    let phim = await Phim.findOne({ _id: id });
    return {
        phim
    }
}
const suaPhim= async function(data){
    var phim = await Phim.findOne({ _id: data.id });
    phim.tenPhim=data.tenPhim;
    phim.theLoai=data.theLoai;
    phim.phatHanh=data.phatHanh;
    phim.moTa=data.moTa;
    if(data.hinh){
    phim.hinh=data.hinh;
    }
    await phim.save();
    return{
        phim
    }

}
const xoaPhim = async function (id) {
    let phim = await Phim.findOne({ _id: id });
    phim.remove();
    return {
        mess:'Xóa Phim thành công!'
    }
}

module.exports = {
    taoPhim: taoPhim,
    layPhim: layPhim,
    layChiTietPhim: layChiTietPhim,
    suaPhim:suaPhim,
    xoaPhim:xoaPhim
}

