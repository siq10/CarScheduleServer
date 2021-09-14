var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authsRouter = require('./routes/auths');
var tutorialsRouter = require('./routes/tutorials');
var proceduresRouter = require('./routes/procedures');

var CryptoServices = require("./rsa/CryptoService")
var CryptoService = CryptoServices.CryptoService
var cs = new CryptoService()  

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auths', authsRouter);
app.use('/tutorials', tutorialsRouter);
app.use('/procedures', proceduresRouter);



const port = 3030

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message =  err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('Error');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
