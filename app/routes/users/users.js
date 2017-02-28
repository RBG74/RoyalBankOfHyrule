var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if(err) 
      res.json(err);
    res.json(users);
  });
});

module.exports = router;
