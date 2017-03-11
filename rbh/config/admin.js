var passport = require('passport');
var User = require('../models/user');

User.findOne({ 'technologicalAdress': 'Admin' }, function (err, admin) {
  if(!admin){
    var admin = new User({
        technologicalAdress: "Admin",
        password: "Admin",
        isAdmin: true
    });
    admin.password = admin.encryptPassword(admin.password);
    admin.save();
  }
});