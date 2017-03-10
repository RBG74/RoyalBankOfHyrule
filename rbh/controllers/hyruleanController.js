var passport = require('passport');
var Hyrulean = require('../models/userHyrulean');
var Pouch = require('../models/pouch');

exports.register = function(req, res, callback){
    if(req.body.isCounsellor){
        //TODO: handle counsellor registration
    }
    else{
        var newHyrulean = new Hyrulean({
            technologicalAdress: req.body.technologicalAdress,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        newHyrulean.password = newHyrulean.encryptPassword(newHyrulean.password);
        //save the user
        newHyrulean.save(function(err, hyrulean){
            if(err) {
                req.session.errors = err;
            }
            var checkingPouch = new Pouch({
                owner: hyrulean._id,
                rupees: 1000
            });
            //save 1st pouch
            checkingPouch.save(function(err){
                var savingPouch = new Pouch({
                    owner: hyrulean._id,
                    type: 'Savings pouch',
                    rupees: 2000
                });
                savingPouch.save(function(err){
                    var pouches = [];
                    pouches.push(checkingPouch);
                    pouches.push(savingPouch);
                    callback(hyrulean, pouches);
                });
            });
        });
    }
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