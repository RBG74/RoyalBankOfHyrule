var passport = require('passport');
var hyruleanController = require('../hyruleanController');
var pouchController = require('../pouchController');

exports.getLogin = function(req, res, next){
    //console.log("frontController.js getLogin");
    res.render('login', { errors: req.session.errors });
    req.session.errors = null;
    req.session.success = null;
}

exports.postLogin = function(req, res, next){
    passport.authenticate('local.login', function(err, hyrulean, info){
        if (err) {
            req.session.errors = err;
        }
        if(!hyrulean){
            req.session.errors = info;
        }
        req.login(hyrulean, function(err) {
            if (err) {
                req.session.errors = err;
            } else {
                req.session.success = true;
            }
            res.redirect('/profile');
        });
    })(req, res, next);
}

exports.getLogout = function(req, res, next){
    req.logout();
    res.redirect('/');
}

exports.getRegister = function(req, res, next){
    //console.log("frontController.js getProfile");
    res.render('register');
    req.session.errors = null;
    req.session.success = null;
}

exports.postRegister = function(req, res, next){
    hyruleanController.register(req, res, function(result){
        res.redirect('/login');
    });
    /*passport.authenticate('local.register', function(err, hyrulean, info){
        if (err) { 
            req.session.errors = err;
        }
        if(!hyrulean){
            req.session.errors = info;
        }
        req.session.success = true;
        res.redirect('/login');
        req.session.errors = null;
        req.session.success = null;
    })(req, res, next);*/
}

exports.getProfile = function(req, res, next){
    //console.log("frontController.js getProfile");
    res.render('loggedin/profile', { user: req.user });
    req.session.errors = null;
    req.session.success = null;
}

exports.getPouches = function(req, res, next){
    //console.log("frontController.js getProfile");
    console.log(req.user.kind);
    if(req.user.kind=="Hyrulean"){
        pouchController.getLoggedUserPouches(req, res, function(pouches){
            console.log(pouches);
            res.render('loggedin/pouches', { user: req.user, pouches: pouches });
            req.session.errors = null;
            req.session.success = null;
        });
    }else{
        req.session.errors = "Only an hyrulean can see this page.";
        res.redirect('/login');
        req.session.errors = null;
    }
}