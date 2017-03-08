var express = require('express');
var router = express.Router();
var hyruleanController = require('../controllers/hyruleanController');

/* Get all hyruleans. */
router.get('/', hyruleanController.getAll);
//////////////////////////////////////////////

/* Form de création d'utilisateur */
router.get('/new', hyruleanController.getNew);

/* Traitement du form de création */
router.post('/new', hyruleanController.postNew);

module.exports = router;
