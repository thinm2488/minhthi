var express = require('express');
var router = express.Router();
var movieController = require('../controller/movieController');

router.post('/', async function (req, res) {
    var phim = await movieController.taoPhim(req.body);
    res.send({
        phim: phim
    })

});

router.get('/',async function(req,res){
        var listphim= await movieController.layPhim();
        res.send({
            listphim:listphim
        })
   
   
})
module.exports = router;