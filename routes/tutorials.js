var express = require('express');
var router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('car_schedule_test', 'nwuser', 'poiasd02', {
  host: 'localhost',
  dialect: 'mysql'
});
var Tutorial = require('../models/Tutorials')(sequelize, DataTypes);

/* GET tutorials. */
router.get('/', async function(req, res, next) {
    const tutorials = await Tutorial.findAll();
    console.log(tutorials.every(tutorials => tutorials instanceof Tutorial));
    console.log("All tutorials:", JSON.stringify(tutorials, null, 2));
    res.status(200).send(JSON.stringify(tutorials, null, 2))
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
