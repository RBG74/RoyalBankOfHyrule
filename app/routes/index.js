var express = require('express');
var router = express.Router();

var Adventurer = require('../models/users/adventurer');

/* GET home page. */
router.get('/', function(req, res, next) {

  var bob = new Adventurer("bob420@gmail.com", "azertyuiop", "Bob", "Blobby");
  bob.register();

  var carl = new Adventurer("carladress", "azertyuiop", "Carl", "Carlito");

  res.render('index', { title: 'Royal Bank of Hyrule', user: bob });
});

module.exports = router;
