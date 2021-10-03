var express = require('express');
var router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('car_schedule_test', 'nwuser', 'poiasd02', {
  host: 'localhost',
  dialect: 'mysql'
});
var User = require('../models/Users')(sequelize, DataTypes);
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var CryptoServices = require("../rsa/CryptoService")
var CryptoService = CryptoServices.CryptoService
var cs = new CryptoService()

async function verifyPassword (enteredPassword, originalPassword) {
  const check = await bcrypt.compare(enteredPassword, originalPassword)
  return check
}

/* POST auths listing. */
router.post('/', function(req, res, next) {
  console.log(req.body.username, req.body.password)
  User.findOne({ where: { 
    username: req.body.username,
  } }).then(user => {
    if (user === null) {
      console.log('User Not found!');
      res.status(401).end()
    } else {
      verifyPassword(req.body.password, user.password).then(authenticated => {
        console.log(authenticated)
        if(authenticated)
        {
          jwt.sign({id:user.id,username:user.username}, CryptoService.privateKey, {
            algorithm: "RS512"
          }, (err, token) => {
            if(err !== null)
            {
              console.log(typeof(CryptoService.privateKey))
              res.status(500).send({error:err})
            }
            else
            {
              console.log(CryptoService.privateKey)
              console.log({user:{username:user.username,email:user.email},token:token})
              res.status(201).send({user:{id:user.id,username:user.username,email:user.email},token:token})
            }
          })
        }
        else
        res.status(401).end()
      })

    }  
  })
  
 
});

module.exports = router;
