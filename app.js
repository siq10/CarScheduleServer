var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Database connection
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('car_schedule_test2', 'nwuser', 'poiasd02', {
  host: 'localhost',
  dialect: 'mysql'
});

// Get the setup function for the models.
var initModels = require("./models/init-models").initModels; 

// Create the models and the relations between them.
const { Cars, Procedures, Secrets, Tutorials, User_Cars, User_Procedures, Users, Notifications, User_Procedure_Notifications} = initModels(sequelize);

var app = express();

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users')(Users);
var authsRouter = require('./routes/auths')(Users);
var tutorialsRouter = require('./routes/tutorials')(Tutorials);
var proceduresRouter = require('./routes/procedures')(Procedures,User_Cars,User_Procedures,Users, Cars, sequelize);

// Nested routers
var userProceduresRouter = require('./routes/users/procedures')(Procedures,User_Cars,User_Procedures,Users, Cars, Notifications, User_Procedure_Notifications);
//

usersRouter.use('/:userId/procedures', userProceduresRouter)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auths', authsRouter);
app.use('/tutorials', tutorialsRouter);
app.use('/procedures', proceduresRouter);


var CryptoServices = require("./rsa/CryptoService");
var CryptoService = CryptoServices.CryptoService
var cs = new CryptoService()  


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
