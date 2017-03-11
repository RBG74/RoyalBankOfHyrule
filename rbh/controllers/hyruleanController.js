var passport = require('passport');
var Hyrulean = require('../models/userHyrulean');
var Counsellor = require('../models/userCounsellor');
var Pouch = require('../models/pouch');

exports.register = function(req, res, callback){
    if(req.body.isCounsellor){
        var newCounsellor = new Counsellor({
            technologicalAdress: req.body.technologicalAdress,
            password: req.body.password,
            clients: []
        });
        newCounsellor.password = newCounsellor.encryptPassword(newCounsellor.password);
        newCounsellor.save(function(err, counsellor){
            if(err) {
                req.session.errors = err;
                return callback();
            }
            callback(counsellor);
        });
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
                console.log('plop', err);
                req.session.errors = err;
                return callback();
            }
            var checkingPouch = new Pouch({
                owner: hyrulean._id,
                rupees: 1000
            });
            //save 1st pouch
            checkingPouch.save(function(err){
                if(err) {
                    req.session.errors = err;
                    return callback();
                }
                var savingPouch = new Pouch({
                    owner: hyrulean._id,
                    type: 'Savings pouch',
                    rupees: 2000
                });
                savingPouch.save(function(err){
                    if(err) {
                        req.session.errors = err;
                        return callback();
                    }
                    var pouches = [];
                    pouches.push(checkingPouch);
                    pouches.push(savingPouch);
                    callback(hyrulean, pouches);
                });
            });
        });
    }
};

exports.getAll = function (req, res, callback) {
    Hyrulean
        .find({})
        .exec(function(err, hyruleans) {
            if(err){
                req.session.errors = err;
                return callback();
            }
            callback(hyruleans);
        });
};