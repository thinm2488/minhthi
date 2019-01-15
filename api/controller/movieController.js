const mongoose = require('mongoose');
require('../model/Movie')
const Phim = mongoose.model('Phim');

const taoPhim = async function (data) {
    var phim = new Phim(data);

    await phim.save();
    return {
        phim: phim
    };

}

const layPhim= async function()
{
    var listphim = await Phim.find();
    return{
        listphim:listphim
    }
}

module.exports = {
    taoPhim: taoPhim,
    layPhim:layPhim
}

