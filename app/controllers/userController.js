var User = require('../models/users/user');


exports.getAll = function (req, res, next) {
    User.find({}, function(err, users) {
        if(err) 
            res.json(err);
        res.json(users);
    });
};