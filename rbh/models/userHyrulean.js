var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = mongoose.Schema(
    {
        firstname: { type: String, required: false },
        lastname: { type: String, required: false }
    }, 
    {
        discriminatorKey: 'kind'
    }
);

var model = User.discriminator('Hyrulean', schema);
module.exports = model;