var express = require('express');
var router = express.Router();
var hyruleanController = require('../controllers/hyruleanController');
var verify = require('./verify');

// LOGIN PASSPORT
router.post('/login', hyruleanController.login);

/* Traitement du form de création */
router.post('/register', hyruleanController.postNew);

router.all('/*', verify.verifyHyrulean, function(req, res, next) {
    next();
});

/* Get all hyruleans. */
router.get('/', hyruleanController.getAll);
//////////////////////////////////////////////

/* Form de création d'utilisateur */
router.get('/new', hyruleanController.getNew);

/* Traitement du form de création */
router.post('/new', hyruleanController.postNew);

module.exports = router;
