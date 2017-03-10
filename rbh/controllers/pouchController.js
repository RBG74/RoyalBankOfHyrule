var passport = require('passport');
var Hyrulean = require('../models/userHyrulean');
var Pouch = require('../models/pouch');

exports.getLoggedUserPouches = function(req, res, callback){
    var hyrulean = req.user;
    Pouch
        .find({owner: hyrulean._id})
        .exec(function(err, pouches){
            callback(pouches);
        });
};