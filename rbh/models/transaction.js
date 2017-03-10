var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    date: {type: Date, required: true},
    amount: {type: Number, required: true}
  },
  {
    discriminatorKey: 'kind'
  }
);

var model = mongoose.model('Transaction', schema);
module.exports = model;