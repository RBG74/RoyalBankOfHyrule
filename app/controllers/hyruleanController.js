var Hyrulean = require('../models/hyrulean');
var Pouch = require('../models/pouch');

exports.getAll = function (req, res, next) {
    Hyrulean
        .find({})
        .exec(function(err, hyruleans) {
            if(err) 
                return res.json({status:400, error:err});
            return res.json({status:200, content:hyruleans});
        });
};


exports.getNew = function (req, res, next) {
    return res.json({status:501, content:"Not implemented yet."});
};

exports.postNew = function (req, res, next) {
    /* We create the hyrulean and make him/her two pouches */
    var newHyrulean = new Hyrulean({
        technologicalAdress: req.body.technologicalAdress,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    });
    newHyrulean.save(function(err){
        if(err)
            return res.json({status:400, error:err});
        console.log('Hyrulean saved sucessfully!');
        
        var checkingPouch = new Pouch({
            owner: newHyrulean._id,
            rupees: 0
        });
        checkingPouch.save(function(err){
            if(err){
                console.log(newHyrulean);
                console.error(err.stack);
                return res.json({status:400, error:err});
            }
            console.log('checkingPouch saved sucessfully!');
            var savingPouch = new Pouch({
                owner: newHyrulean._id,
                type: 'Savings pouch',
                rupees: 0
            });
            savingPouch.save(function(err){
                if(err)
                    return res.json({status:400, error:err});
                console.log('savingPouch saved sucessfully!');
                return res.json({status: 200, content:""});
            });
        });
    });
};