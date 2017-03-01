var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var options = {
  discriminatorKey: 'kind'
};

var HyruleanSchema = new Schema({
    rupees: Number
    //pouches: [{ type: Schema.Types.ObjectId, ref: 'Pouches' }]
}, options);

var Hyrulean = User.discriminator('Hyrulean', HyruleanSchema);
module.exports = Hyrulean;