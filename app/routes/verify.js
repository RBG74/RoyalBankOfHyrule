var Hyrulean = require('../models/hyrulean');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function(Hyrulean) {
	return jwt.sign(Hyrulean, config.secretKey, { expiresInMinutes: "1h" });
};

exports.verifyHyrulean = function(req, res, next) {
	var token = req.cookies.auth || req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err) {
				res.json(err);
			}
			else {
				req.decoded = decoded;
				next();
			}
		})
	}
	else {
		res.status(401).json({status: 401, message: "Unauthorized", information: "You need to be logged in."});
	}
};