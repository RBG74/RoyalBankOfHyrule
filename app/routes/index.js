var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {

  var bob = new User("Bob420", "bob420@gmail.com", "azertyuiop");
  bob.register();

  res.render('index', { title: 'Royal Bank of Hyrule', user: bob });
});

module.exports = router;
