var express = require('express');
var router = express.Router();
var counsellorController = require('../controllers/counsellorController');

/* Get all counsellors. */
router.get('/', counsellorController.getAll);

/* Form de création d'utilisateur */
router.get('/new', counsellorController.getNew);

/* Traitement du form de création */
router.post('/new', counsellorController.postNew);

module.exports = router;
