var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = require('./transaction');

var schema = new Schema(
    {
        investedIn: {
            type: String,
            enum: ["Terry's shop", "Kokiri Shop", "Goron Shop"],
            default: "Terry's shop"
        }
    }, 
    {
        discriminatorKey: 'kind'
    }
);

var model = Transaction.discriminator('Investment', schema);
module.exports = model;