var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema(
    {
        clients: [{
            type: Schema.Types.ObjectId,
            ref: 'Hyrulean'
        }]
    },
    {
        discriminatorKey: 'kind'
    }
);

var model = User.discriminator('Counsellor', schema);
module.exports = model;