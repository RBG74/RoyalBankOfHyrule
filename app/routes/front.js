var express = require('express');
var router = express.Router();
var frontController = require('../controllers/frontController');
var hyruleanController = require('../controllers/hyruleanController');
var verify = require('./verify');

// LOGIN PASSPORT
router.get('/login', frontController.getLogin);
router.post('/login', hyruleanController.postLogin);

router.all('/*', verify.verifyHyrulean, function(req, res, next) {
    next();
});

router.get('/profile', frontController.getProfile);


module.exports = router;
