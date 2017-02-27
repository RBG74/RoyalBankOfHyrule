var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        technologicalAdress: String,
        firstname: String,
        lastname: String,
        password: String
    }, 
    { 
        collection: 'users', 
        discriminatorkey: '_type' 
    }
);

module.exports = mongoose.model('User', UserSchema);