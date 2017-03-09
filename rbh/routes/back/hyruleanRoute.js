var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('../../controllers/util');
var hyruleanController = require('../../controllers/back/hyruleanController');

/* Register a new Hyrulean */
router.post('/signin', hyruleanController.signin);

router.post('/login', hyruleanController.login);

router.get('/all', util.isLoggedIn, hyruleanController.getAll);


module.exports = router;