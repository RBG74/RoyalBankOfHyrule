var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var options = {
  discriminatorKey: 'kind'
};

var HyruleanSchema = new Schema({
    rupees: Number
}, options);

var Hyrulean = User.discriminator('Hyrulean', HyruleanSchema);
module.exports = Hyrulean;