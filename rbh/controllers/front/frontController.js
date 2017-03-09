var hyruleanController = require('../back/hyruleanController');

exports.getLogin = function(req, res, next){
    res.render('login', { title: 'Royal Bank of Hyrule' });
}

exports.postLogin = function(req, res, next){
    hyruleanController.login(req, res, next);
    console.log(res);
    res.render('index', { title: 'Royal Bank of Hyrule' });
}