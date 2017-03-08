var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Pouch = require('./pouch');

var options = {
  discriminatorKey: 'kind'
};

var hyruleanSchema = new Schema({
  username: { type: String, required: true, unique: true },
  technologicalAdress: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  //password: { type: String, required: true },
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

hyruleanSchema.plugin(passportLocalMongoose);
var Hyrulean = mongoose.model('Hyrulean', hyruleanSchema);
module.exports = Hyrulean;