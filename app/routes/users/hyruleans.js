var express = require('express');
var router = express.Router();

var User = require('../../models/users/user');
var Hyrulean = require('../../models/users/hyrulean');

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
        password: req.body.password,
        rupees: req.body.rupees
    });
    console.log(newHyrulean);
    newHyrulean.save(function(err){
        if(err)
            throw err;
        console.log('Hyrulean saved sucessfully!');
        res.json(newHyrulean);
    });
});

module.exports = router;
