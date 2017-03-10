var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var options = {
  discriminatorKey: 'kind'
};

var schema = mongoose.Schema(
    {
        technologicalAdress: {type: String, requried: true, unique: true},
        password: {type: String, requried: true},
        isAdmin: {type: Boolean, default: false}
    },
    {
        discriminatorKey: 'kind'
    }
);

schema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

schema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

var model = mongoose.model("User", schema);
module.exports = model;