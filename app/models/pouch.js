var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./users/user');
var Pouch = require('./users/hyrulean');

var pouchSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['Checking pouch', 'Savings pouch'],
        default: 'Checking pouch'
    },
    rupees: {
        type: Number,
        default: 0
    },
    history: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'History'
        }
    ],
    created_at: Date,
    updated_at: Date
});

pouchSchema.pre('save', function(next) {
  var currentDate = new Date();
  if( !this.created_at )
    this.created_at = currentDate;
  this.updated_at = currentDate;
  next();
});

var Pouch = mongoose.model('Pouch', pouchSchema);
module.exports = Pouch;