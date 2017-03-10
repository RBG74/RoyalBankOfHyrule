var express = require('express');
var router = express.Router();
var util = require('./util');
var frontController = require('../controllers/front/frontController');
var hyruleanController = require('../controllers/hyruleanController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Royal Bank of Hyrule' });
});

router.get('/login', frontController.getLogin);
router.post('/login', frontController.postLogin);
router.get('/logout', frontController.getLogout);

router.get('/register', frontController.getRegister);
router.post('/register', frontController.postRegister);

router.get('/profile', util.isLoggedIn, frontController.getProfile);
router.get('/pouches', util.isLoggedIn, frontController.getPouches);
//router.post('/login', frontController.postLogin);

module.exports = router;
