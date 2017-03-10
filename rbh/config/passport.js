var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

/*passport.use('local.register', new LocalStrategy(
    {
        usernameField: 'technologicalAdress',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, technologicalAdress, password, done){
        User.findOne({'technologicalAdress': technologicalAdress}, function(err, user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null, false, {message: 'Technological adress already in use.'})
            }
            var newUser = new User();
            newUser.technologicalAdress = technologicalAdress;
            newUser.password = newUser.encryptPassword(password);
            newUser.save(function(err, result){
                if(err){
                    return done(err);
                }
                return done(null, newUser);
            });
        });
    }
));*/

passport.use('local.login', new LocalStrategy(
    {
        usernameField: 'technologicalAdress',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, technologicalAdress, password, done){
        User.findOne({'technologicalAdress': technologicalAdress}, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                console.log('No user found.');
                return done(null, false, {message: 'No user found.'})
            }
            if(!user.validPassword(password)){
                return done(null, false, {message: 'Incorrect password.'})
            }
            return done(null, user);
        });
    }
));