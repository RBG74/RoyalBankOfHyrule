var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var options = {
  discriminatorKey: 'kind'
};

var hyruleanSchema = new Schema({
  username: { type: String, required: true, unique: true },
  technologicalAdress: { type: String, required: true, unique: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  created_at: Date,
  updated_at: Date
}, options);

hyruleanSchema.pre('save', function(next) {
  this.username = this.technologicalAdress;
  var currentDate = new Date();
  if( !this.created_at )
    this.created_at = currentDate;
  this.updated_at = currentDate;
  next();
});

hyruleanSchema.plugin(passportLocalMongoose);
var Hyrulean = mongoose.model('Hyrulean', hyruleanSchema);
module.exports = Hyrulean;