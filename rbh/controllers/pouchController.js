var passport = require('passport');
var Hyrulean = require('../models/userHyrulean');
var Pouch = require('../models/pouch');
var Transfer = require('../models/transfer');

exports.getLoggedUserPouches = function(req, res, callback){
    var hyrulean = req.user;
    Pouch
        .find({owner: hyrulean._id})
        .populate('history')
        .populate({
            path: 'history',
            model: 'Transaction',
            populate: {
                path: 'concernedPouch',
                model: 'Pouch',
                populate: {
                    path: 'owner',
                    model: 'Hyrulean'
                }
            }
        })
        .lean()
        .exec(function(err, pouches){
            for(pouch in pouches){
                for(transfer in pouch.history){
                    transfer.test = "plop";
                    /*Pouch.findOne({'_id': transfer.cPouch}, function(err, pouch){
                        transfer.cPouch = pouch;
                        Hyrulean.findOne({ '_id': transfer.cPouch.owner }, function(err, hyrulean){
                            transfer.cPouch.hyrulean = hyrulean;
                        });
                    });*/
                }
            }
            callback(pouches);
        });
};

exports.postTransfer= function(req, res, callback){
    var transferTo = req.body.target;
    var amount = req.body.amount;
    if(amount<0){
        req.session.errors = "Can't transfer a negative amount.";
        return callback();
    }

    Pouch.findOne({ 'owner': transferTo, 'type': 'Checking pouch' }, function (err, targetPouch) {
        if (err){
            req.session.errors = err;
            return callback();
        }
        targetPouch.rupees += Number(amount);
        targetPouch.save(function(err){
            Pouch.findOne({ 'owner': req.user._id, 'type': 'Checking pouch' }, function (err, loggedPouch) {
                if (err){
                    req.session.errors = err;
                    return callback();
                }
                loggedPouch.rupees -= Number(amount);
                loggedPouch.save(function(err){
                    /* Handle transfers history */
                    var transferToTarget = new Transfer({
                        amount: -amount,
                        concernedPouch: targetPouch._id
                    });
                    transferToTarget.save(function(err, transfer){
                        if(err){
                            req.session.errors = err;
                            return callback();
                        }
                        console.log("transfer",transfer);
                        loggedPouch.history.push(transfer._id);
                        loggedPouch.save(function(err){
                            if(err){
                                req.session.errors = err;
                                return callback();
                            }
                            var transferToLogged = new Transfer({
                                amount: amount,
                                concernedPouch: loggedPouch._id
                            });
                            transferToLogged.save(function(err, transfer){
                                if(err){
                                    req.session.errors = err;
                                    return callback();
                                }
                                targetPouch.history.push(transfer._id);
                                targetPouch.save(function(err){
                                    if(err){
                                        req.session.errors = err;
                                        return callback();
                                    }
                                    callback();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

};