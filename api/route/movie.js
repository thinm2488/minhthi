var express = require('express');
var router = express.Router();
var movieController = require('../controller/movieController');

router.post('/', async function (req, res) {
    var phim = await movieController.taoPhim(req.body);
    res.send({
        phim: phim
    })

});
// tao listphim hung data về tu database
router.get('/',async function(req,res){
        var listphim= await movieController.layPhim();
        res.send({
            listphim:listphim
        })
   
   
})
router.post('/detail',async function(req,res){
    var phim = await movieController.layChiTietPhim(req.body.id);
    res.send({
        phim:phim
    })
})
module.exports = router;