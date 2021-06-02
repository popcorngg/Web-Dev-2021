var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dbConfig = require('./config/dbconfig');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
switch (app.get('env')) {
    case 'development':
        mongoose.connect("mongodb+srv://student:Start2020@cluster0-qse6h.mongodb.net/sample-database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        break;
    case 'production':
        mongoose.connect("mongodb+srv://student:Start2020@cluster0-qse6h.mongodb.net/sample-database", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        break;
    default:
        throw new Error('DB Error!');
}
mongoose.Promise = global.Promise;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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