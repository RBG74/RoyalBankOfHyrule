var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pouch = require('./pouch');

var options = {
  discriminatorKey: 'kind'
};

var hyruleanSchema = new Schema({
  technologicalAdress: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
}, options);

hyruleanSchema.pre('save', function(next) {
  var currentDate = new Date();
  if( !this.created_at )
    this.created_at = currentDate;
  this.updated_at = currentDate;
  next();
});

var Hyrulean = mongoose.model('Hyrulean', hyruleanSchema);
module.exports = Hyrulean;