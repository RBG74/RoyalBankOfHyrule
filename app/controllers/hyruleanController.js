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

exports.postLogin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            var token = verify.getToken(user);
            console.log(req.body);
            res.cookie('userAdress', req.body.InputTechnologicalAdress);
            res.cookie('auth',token);
            console.log(req.cookies);
            return res.json({status:200, content:token});
        });
    })(req, res, next);
};

exports.getOne = function (req, res, next) {
    var userid = res.cookies.userid;
    Hyrulean.findOne({ '_id': userid }, function (err, connecteduser) {
        if (err) return handleError(err);
        console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
    })
    return res.json({status:501, content:"Not implemented yet."});
};


exports.getNew = function (req, res, next) {
    return res.json({status:501, content:"Not implemented yet."});
};

exports.postNew = function (req, res, next) {
    /* We create the hyrulean and make him two pouches */
    var newHyrulean = new Hyrulean({
        username: req.body.technologicalAdress,
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