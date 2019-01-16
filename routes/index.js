var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cinema Website' });
});
router.get('/movie/create', function(req, res, next) {
  res.render('movie/create', { title: 'Create movie' });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  res.render('movie/detail', { id:id });
});



module.exports = router;
