var express = require('express');
var router = express.Router({mergeParams: true});

var User_Procedure = {}
var User = {}
var User_Car = {}
var Procedure = {}
var Car = {}


var jwt = require('jsonwebtoken');

var CryptoServices = require("../../rsa/CryptoService")
var CryptoService = CryptoServices.CryptoService
var cs = new CryptoService()


router.get('/:procId', async (req, res, next) => {
        res.status(200)
            .send('hello procedure ' + req.params.procId + ' from user ' + req.params.userId);
});

/* GET user-procedures for user with particular id. */

router.get('/', async function(req, res, next) {
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

router.get('/', async function(req, res, next) {
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

router.get('/', async function(req, res, next) {
    const user_procedures = await User_Procedure.findAll( 
        { attributes: ['id', 'start_date', 'confirmed'] , include: [
            {model:Procedure, as:'procedure' , attributes: ['type']},
            {model:User_Car,as:'user_car', attributes:['plate'], include: [{model:Car, as:'car', attributes:['brand','model','release_year']}]}], where:{ user_id : req.params.userId, finished : 0 }});
    console.log(user_procedures.every(up => up instanceof User_Procedure));
    // const up 
    // console.log()
    res.status(200).send(JSON.stringify(user_procedures, null, 2))
});

module.exports = (procedures,user_cars,user_procedures,users,cars) =>
{
    Procedure = procedures
    User_Car = user_cars
    User_Procedure = user_procedures
    User = users
    Car = cars
    return router;
} 
