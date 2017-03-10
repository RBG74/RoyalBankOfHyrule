var passport = require('passport');

exports.isLoggedIn = function(req, res, next){
    //console.log("util.js isLoggedIn");
    if(req.isAuthenticated()){
        return next();
    }
    req.session.success = false;
    req.session.errors = "You need to be logged in.";
    res.redirect('login');
};