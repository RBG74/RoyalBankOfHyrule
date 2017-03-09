var passport = require('passport');
var Hyrulean = require('../../models/userHyrulean');

exports.signin = function(req, res, next){
    passport.authenticate('local.signup', function(err, hyrulean, info){
        if (err) { 
            return res.json({status: 400, error: err});
        }
        if(!hyrulean){
            return res.json({status: 400, message: info.message});
        }
        return res.json({status: 200, hyrulean: hyrulean});
    })(req, res, next);
};

exports.login = function(req, res, next){
    passport.authenticate('local.login', function(err, hyrulean, info){
        if (err) {
            return res.json({status: 400, error: err});
        }
        if(!hyrulean){
            return res.json({status: 400, message: info.message});
        }
        req.login(hyrulean, function(err) {
            if (err) {
                return res.json({status: 500, error: err});
            } else {
                return res.json({status: 200, hyrulean: hyrulean});
            }
        });
    })(req, res, next);
};

exports.logout = function(req, res, next){
    req.logout();
    return res.json({status:200, message:"Logged out."});
};

exports.getAll = function (req, res, next) {
    Hyrulean
        .find({})
        .exec(function(err, hyruleans) {
            if(err)
                return res.json({status:400, error: err});
            return res.json({status:200, content:hyruleans});
        });
};