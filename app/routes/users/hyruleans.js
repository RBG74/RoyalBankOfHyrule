var express = require('express');
var router = express.Router();

var User = require('../../models/users/user');
var Hyrulean = require('../../models/users/hyrulean');
var Pouch = require('../../models/pouch');

/* Get all hyruleans. */
router.get('/', function(req, res, next) {
    Hyrulean.find({})
            .populate('pouches')
            .exec(function(err, hyruleans) {
                if(err) 
                    res.json(err);
                res.json(hyruleans);
            });
});

/* Form de création d'utilisateur */
router.get('/new', function(req, res, next) {
    res.send('respond with a resource');
});

/* Traitement du form de création */
router.post('/new', function(req, res, next) {
  
    var newHyrulean = new Hyrulean({
        technologicalAdress: req.body.technologicalAdress,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    });
    newHyrulean.save(function(err){
        if(err)
            res.json(err);
        console.log('Hyrulean saved sucessfully!');
        
        var checkingPouch = new Pouch({
            owner: newHyrulean._id,
            rupees: 0
        });
        checkingPouch.save(function(err){
            if(err)
                res.json(err);
            console.log('checkingPouch saved sucessfully!');
            var savingPouch = new Pouch({
                owner: newHyrulean._id,
                type: 'Savings pouch',
                rupees: 0
            });
            savingPouch.save(function(err){
                if(err)
                    res.json(err);
                console.log('savingPouch saved sucessfully!');

                newHyrulean.pouches.push(checkingPouch._id);
                newHyrulean.pouches.push(savingPouch._id);
                newHyrulean.save(function(err){
                    if(err)
                        res.json(err);
                    res.status(200).json({status: 200});
                });
            });
        });
    });
});

module.exports = router;
