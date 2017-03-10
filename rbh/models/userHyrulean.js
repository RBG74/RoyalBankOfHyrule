var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema(
    {
        firstname: { type: String, required: false },
        lastname: { type: String, required: false },
        created_at: Date,
        updated_at: Date
    }, 
    {
        discriminatorKey: 'kind'
    }
);

schema.pre('save', function(next) {
    var currentDate = new Date();
    if( !this.created_at )
        this.created_at = currentDate;
    this.updated_at = currentDate;
    next();
});

var model = User.discriminator('Hyrulean', schema);
module.exports = model;