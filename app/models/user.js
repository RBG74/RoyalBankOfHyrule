var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = {
  discriminatorKey: 'kind'
};

var userSchema = new Schema({
  technologicalAdress: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
}, options);

userSchema.pre('save', function(next) {
  var currentDate = new Date();
  if( !this.created_at )
    this.created_at = currentDate;
  this.updated_at = currentDate;
  next();
});

var User = mongoose.model('User', userSchema);
module.exports = User;