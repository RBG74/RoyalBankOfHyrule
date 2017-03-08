var express = require('express');
var router = express.Router();
var hyruleanController = require('../controllers/hyruleanController');
var verify = require('./verify');

// LOGIN PASSPORT
router.post('/login', hyruleanController.login);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
