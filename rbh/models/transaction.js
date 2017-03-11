var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    date: {type: Date, required: true, default: new Date()},
    amount: {type: Number, required: true}
  },
  {
    discriminatorKey: 'kind'
  }
);

schema.pre('save', function(next) {
    var currentDate = new Date();
    if( !this.date )
        this.date = currentDate;
    next();
});

var model = mongoose.model('Transaction', schema);
module.exports = model;