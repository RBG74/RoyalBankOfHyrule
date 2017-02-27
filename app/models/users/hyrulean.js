var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var userSchema = require('./user');

var HyruleanSchema = userSchema.extend(
    {
        rupeePouch: [{
            isSavingsPouch: Boolean,
            balance: Number,
            crafted_at: Date,
            validate: [minimumPouches, 'An Hyrulean needs at least 2 rupee pouches.']
        }]
    }
);

function minimumPouches(val){
    return val.length > 2;
}

module.exports = mongoose.model('Hyrulean', HyruleanSchema);