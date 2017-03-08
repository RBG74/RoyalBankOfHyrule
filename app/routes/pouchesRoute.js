var express = require('express');
var router = express.Router();

var Hyrulean = require('../models/hyrulean');
var Pouch = require('../models/pouch');

/* Get all pouches. */
router.get('/', function(req, res, next) {
    Pouch.find({})
            .populate('owner', 'firstname')
            .exec(function(err, pouches) {
                if(err) 
                    return res.json({status:400, err});
                return res.json({status:200, content:pouches});
            });
});

module.exports = router;