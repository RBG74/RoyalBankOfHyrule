var Hyrulean = require('../models/hyrulean');
var Pouch = require('../models/pouch');
var passport = require('passport');
var verify = require('../routes/verify');

exports.getLogin = function (req, res, next) {
    res.render('login', { title: 'Login' });
};

exports.getProfile = function (req, res, next) {
    var user = Hyrulean.findOne({'technologicalAdress': res.cookies.userAdress}, function(err, user){
        //TODO: handle error
    });
    var pouches = Pouch.find({'owner':user._id}, function(err, user){
        //TODO: handle error
    });
    res.render('profile', { title: 'Profile', user: user, pouches: pouches});
};