var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pouch = require('./hyrulean');

var pouchSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Hyrulean'
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
    if(this.owner.kind != "Hyrulean"){
         var err = new Error('Only an hyrulean can have a pouch.');
         next(err);
    } else {
        var currentDate = new Date();
        if( !this.created_at )
            this.created_at = currentDate;
        this.updated_at = currentDate;
        next();
    }
});

var Pouch = mongoose.model('Pouch', pouchSchema);
module.exports = Pouch;