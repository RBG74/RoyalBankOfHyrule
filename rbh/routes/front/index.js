var express = require('express');
var router = express.Router();
var frontController = require('../../controllers/front/frontController');
var hyruleanController = require('../../controllers/back/hyruleanController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Royal Bank of Hyrule' });
});

router.get('/login', frontController.getLogin);
router.post('/login', frontController.postLogin);

module.exports = router;
