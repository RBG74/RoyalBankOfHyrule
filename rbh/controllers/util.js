var passport = require('passport');

exports.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.json({status:401, message: "Not logged in."});
};