var express = require('express');
var router = express.Router();
var user_controller = require('../../controllers/userController');

/* Get all users. */
router.get('/', user_controller.getAll);

module.exports = router;
