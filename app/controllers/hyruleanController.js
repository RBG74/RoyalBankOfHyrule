var Hyrulean = require('../models/hyrulean');
var Pouch = require('../models/pouch');
var passport = require('passport');
var verify = require('../routes/verify');

exports.getAll = function (req, res, next) {
    Hyrulean
        .find({})
        .exec(function(err, hyruleans) {
            if(err) 
                return res.json({status:400, err});
            return res.json({status:200, content:hyruleans});
        });
};

exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, Hyrulean, info) {
      req.logIn(Hyrulean, function(err) {
        var token = verify.getToken(Hyrulean);
        console.log("Hyrulean: "+Hyrulean);
        
        res.cookie('auth',token);
        return res.json({status:200, content:token});
      });
    })(req, res, next);
};

exports.getNew = function (req, res, next) {
    return res.json({status:501, content:"Not implemented yet."});
};

exports.postNew = function (req, res, next) {
    /* We create the hyrulean and make him two pouches */
    var newHyrulean = new Hyrulean({
        username: req.body.username,
        technologicalAdress: req.body.technologicalAdress,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    Hyrulean.register(
        newHyrulean,
        req.body.password, 
        function(err) {
            if(err){
                //console.log(newHyrulean);
                console.error(err);
                return res.json({status:400, err, newHyrulean});
            }
            console.log('Hyrulean saved sucessfully!');
            
            var checkingPouch = new Pouch({
                owner: newHyrulean._id,
                rupees: 0
            });
            checkingPouch.save(function(err){
                if(err){
                    console.log(newHyrulean);
                    console.error(err.stack);
                    return res.json({status:400, err});
                }
                console.log('checkingPouch saved sucessfully!');
                var savingPouch = new Pouch({
                    owner: newHyrulean._id,
                    type: 'Savings pouch',
                    rupees: 0
                });
                savingPouch.save(function(err){
                    if(err)
                        return res.json({status:400, err});
                    console.log('savingPouch saved sucessfully!');
                    return res.json({status: 200, content:[newHyrulean, checkingPouch, savingPouch]});
                });
            });
        });
};