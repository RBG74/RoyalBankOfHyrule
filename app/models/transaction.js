var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = {
  discriminatorKey: 'kind'
};

var transactionSchema = new Schema({
    date: {type: Date, required: true},
    amount: {type: Number, required: true}
}, options);

var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;