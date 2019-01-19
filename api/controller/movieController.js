const mongoose = require('mongoose');
const Phim = mongoose.model('Phim');


const taoPhim = async function (data) {
    var phim = new Phim(data);
    await phim.save();
    return {
        phim
    };

}

const layPhim = async function () {//find()= select*
    var listphim = await Phim.find();
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


module.exports = {
    taoPhim: taoPhim,
    layPhim: layPhim,
    layChiTietPhim: layChiTietPhim
}

