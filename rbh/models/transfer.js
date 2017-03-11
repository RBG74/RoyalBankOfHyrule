var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = require('./transaction');

var schema = new Schema(
    {
        concernedPouch:{
            type: Schema.Types.ObjectId,
            ref: 'Pouch',
            required: true
        }
    }, 
    {
        discriminatorKey: 'kind'
    }
);

var model = Transaction.discriminator('Transfer', schema);
module.exports = model;