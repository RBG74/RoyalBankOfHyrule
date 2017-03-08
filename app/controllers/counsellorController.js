var Hyrulean = require('../models/hyrulean');
var Counsellor = require('../models/counsellor');
var Pouch = require('../models/pouch');

exports.getAll = function (req, res, next) {
    Hyrulean
        .find({})
        .exec(function(err, hyruleans) {
            if(err) 
                return res.json({status:400, err});
            return res.json({status:200, content:hyruleans});
        });
};


exports.getNew = function (req, res, next) {
    return res.json({status:501, content:"Not implemented yet."});
};

exports.postNew = function (req, res, next) {
    /* We create the hyrulean and make him/her two pouches */
    var newCounsellor = new Counsellor({
        technologicalAdress: req.body.technologicalAdress,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    });
    newCounsellor.save(function(err){
        if(err)
            return res.json({status:400, err});
        console.log('Counsellor saved sucessfully!');
        return res.json({status: 200, content:newCounsellor});
    });
};