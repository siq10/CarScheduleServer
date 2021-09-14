var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const { Sequelize } = require('sequelize');
 
  const sequelize = new Sequelize('car_schedule_test', 'nwuser', 'poiasd02', {
    host: 'localhost',
    dialect: 'mysql'
  });
  // console.log(sequelize)
  sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');
    res.status(200)
    res.send("Logged in DB")  
  })
  .catch(function (err) {
    console.error('Unable to connect to the database:', err);
    res.status(err.status || 500)
    res.send('no work :(')  
  });
});

module.exports = router;
