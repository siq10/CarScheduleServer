const e = require('express');
var express = require('express');
var router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('car_schedule_test', 'nwuser', 'poiasd02', {
  host: 'localhost',
  dialect: 'mysql'
});
var User_Procedure = require('../models/User_Procedures')(sequelize, DataTypes);

var jwt = require('jsonwebtoken');

var CryptoServices = require("../rsa/CryptoService")
var CryptoService = CryptoServices.CryptoService
var cs = new CryptoService()

/* GET user-procedures for user with particular id. */

router.get('/:id', async function(req, res, next) {
    const token = req.get("authorization").split(" ")[1]
    if(token == null )
    {
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    else
    {
        req.token = token
        next()
    }
});

router.get('/:id', async function(req, res, next) {
    if(req.token)
    {
        jwt.verify(req.token, CryptoService.publicKey, (err, decoded) =>  {
            if(!err)
            {
                console.log(decoded)
                next()
            }
            else
            {
                console.log(err)
                return res.status(403).json({ error: 'Token invalid!' });
            }
        })
    }
    else
    {
        return res.status(500).json({ error: 'Wrong branch for no credentials sent!' });
    }
});

router.get('/:id', async function(req, res, next) {
    const user_procedures = await User_Procedure.findAll();
    console.log(user_procedures.every(up => up instanceof User_Procedure));
    res.status(200).send(JSON.stringify(user_procedures, null, 2))
});


router.post('/', function(req,res,next)
{
  
})
module.exports = router;
