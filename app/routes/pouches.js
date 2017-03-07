var express = require('express');
var router = express.Router();

var User = require('../models/users/user');
var Hyrulean = require('../models/users/hyrulean');
var Pouch = require('../models/pouch');

/* Get all pouches. */
router.get('/', function(req, res, next) {
    Pouch.find({})
            .populate('owner', 'firstname')
            .exec(function(err, pouches) {
                if(err) 
                    res.json(err);
                res.json(pouches);
            });
});

module.exports = router;