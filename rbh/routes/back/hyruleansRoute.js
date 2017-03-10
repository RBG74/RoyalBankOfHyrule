var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('../util');
var hyruleanController = require('../../controllers/hyruleanController');

//// Hyrulean ////
/*router.post('/register', hyruleanController.register);
router.post('/login', hyruleanController.login);
router.post('/logout', util.isLoggedIn, hyruleanController.logout);

router.get('/all', util.isLoggedIn, hyruleanController.getAll);*/


module.exports = router;