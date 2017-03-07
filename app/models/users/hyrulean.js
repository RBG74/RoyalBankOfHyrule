var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Pouch = require('../pouch');

var options = {
  discriminatorKey: 'kind'
};

var HyruleanSchema = new Schema({
    pouches: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Pouch' 
    }]
}, options);

var Hyrulean = User.discriminator('Hyrulean', HyruleanSchema);
module.exports = Hyrulean;