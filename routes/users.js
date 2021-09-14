var express = require('express');
var router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('car_schedule_test', 'nwuser', 'poiasd02', {
  host: 'localhost',
  dialect: 'mysql'
});
var User = require('../models/Users')(sequelize, DataTypes);
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/', function(req,res,next)
{
  bcrypt.genSalt(10, function(err, salt) {
    if(err)
      res.sendStatus(500)
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        if(err)
          res.sendStatus(500)
          User.create({
            username: req.body.username,
            password: hash,
            email: req.body.email
          }).then(function (user){
            console.log(user)
            res.sendStatus(201)
          }).catch(function (err)
          {
            console.log(err)
            res.sendStatus(400)
          });
    });
  });
  
})
module.exports = router;
