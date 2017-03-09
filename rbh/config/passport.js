var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Hyrulean = require('../models/userHyrulean');

passport.serializeUser(function(user, done){
    console.log("serializeUser");
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
    console.log("deserializeUser");
  Hyrulean.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.register', new LocalStrategy(
    {
        usernameField: 'technologicalAdress',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, technologicalAdress, password, done){
        Hyrulean.findOne({'technologicalAdress': technologicalAdress}, function(err, hyrulean){
            if(err){
                return done(err);
            }
            if(hyrulean){
                return done(null, false, {message: 'Technological adress already in use.'})
            }
            var newHyrulean = new Hyrulean();
            newHyrulean.technologicalAdress = technologicalAdress;
            newHyrulean.password = newHyrulean.encryptPassword(password);
            newHyrulean.save(function(err, result){
                if(err){
                    return done(err);
                }
                return done(null, newHyrulean);
            });
        });
    }
));

passport.use('local.login', new LocalStrategy(
    {
        usernameField: 'technologicalAdress',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, technologicalAdress, password, done){
        Hyrulean.findOne({'technologicalAdress': technologicalAdress}, function(err, hyrulean){
            if(err){
                return done(err);
            }
            if(!hyrulean){
                console.log('No hyrulean found.');
                return done(null, false, {message: 'No hyrulean found.'})
            }
            if(!hyrulean.validPassword(password)){
                return done(null, false, {message: 'Incorrect password.'})
            }
            return done(null, hyrulean);
        });
    }
));