var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = require('./transaction');

var options = {
  discriminatorKey: 'kind'
};

var transactionSchema = new Schema({
    investedIn: {
        type: String,
        enum: ["Terry's shop", "Kokiri Shop", "Goron Shop"],
        default: "Terry's shop"
    }
}, options);

var Investment = Transaction.discriminator('Investment', transactionSchema);
module.exports = Investment;