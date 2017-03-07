var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* Database connection */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RBH');
var db = mongoose.connection;
db.once('open', function() {
  console.log("Connection to database successfull :)");
});

/*
var User = require('./models/users/user');
var Hyrulean = require('./models/users/hyrulean');

var Bob = new Hyrulean({
  username: 'Bob420',
  password: 'azertyuiop',
  rupees: 50
});
console.log(Bob);*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
var index = require('./routes/index');
app.use('/', index);
var users = require('./routes/users/users');
app.use('/users', users);
var hyruleans = require('./routes/users/hyruleans');
app.use('/users/hyruleans', hyruleans);
var pouches = require('./routes/pouches');
app.use('/pouches', pouches);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
