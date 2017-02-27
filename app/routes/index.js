var express = require('express');
var router = express.Router();

var Adventurer = require('../models/users/hyrulean');

/* GET home page. */
router.get('/', function(req, res, next) {

  var bob = new Hyrulean("bob420@gmail.com", "azertyuiop", "Bob", "Blobby");

  res.render('index', { title: 'Royal Bank of Hyrule', user: bob });
});

module.exports = router;
