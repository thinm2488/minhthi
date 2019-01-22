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

router.get('/user/signup', function(req, res, next) {
  res.render('user/signup', { title: 'Sign-up' });
});
router.get('/user/signin', function(req, res, next) {
  res.render('user/signin', { title: 'Sign-in' });
});
router.get('/user/profile', function(req, res, next) {
  res.render('user/profile', { title: 'Use profile' });
});

router.get('/user/editprofile', function(req, res, next) {
  res.render('user/editprofile', { title: 'Edit profile' });
});
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;

  res.render('movie/edit', { id:id });
});




module.exports = router;
