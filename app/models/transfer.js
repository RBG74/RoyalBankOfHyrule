var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = require('./transaction');

var options = {
  discriminatorKey: 'kind'
};

var transferSchema = new Schema({
    transferedTo: {
        type: Schema.Types.ObjectId,
        ref: Pouch,
        required: true
    }
}, options);

var Transfer = Transaction.discriminator('Transfer', transactionSchema);
module.exports = Transfer;