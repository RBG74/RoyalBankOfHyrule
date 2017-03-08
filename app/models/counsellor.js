var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hyrulean = require('./hyrulean');

var options = {
  discriminatorKey: 'kind'
};

var counsellorSchema = new Schema({
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Hyrulean'
    }]
}, options);

var Counsellor = Hyrulean.discriminator('Counsellor', counsellorSchema);
module.exports = Counsellor;