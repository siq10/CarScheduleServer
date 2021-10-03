var express = require('express');
var router = express.Router({mergeParams: true});

var User_Procedure = {}
var User = {}
var User_Car = {}
var Procedure = {}
var Car = {}


var jwt = require('jsonwebtoken');

var CryptoServices = require("../../rsa/CryptoService");
const { route } = require('../auths');
var CryptoService = CryptoServices.CryptoService
var cs = new CryptoService()

router.use((req, res, next) => {
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
})

/* GET user-procedures for user with particular id. */

// router.get('/', async function(req, res, next) {
//     const token = req.get("authorization").split(" ")[1]
//     if(token == null )
//     {
//         return res.status(403).json({ error: 'No credentials sent!' });
//     }
//     else
//     {
//         req.token = token
//         next()
//     }
// });

router.use(async function(req, res, next) {
    if(req.token)
    {
        jwt.verify(req.token, CryptoService.publicKey, (err, decoded) =>  {
            if(!err)
            {
                req.tokenId = decoded.id
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

router.use(async function(req, res, next) {
    if(req.tokenId == req.params.userId)
    {
        next()
    }
    else
    {
        return res.status(401).json({ error: "You don't have access to this user's data"});
    }
});

router.get('/:procId', async (req, res) => {
    const user_procedure = await User_Procedure.findOne(
        {
            attributes: ['cost', 'summary', 'start_date', 'end_date', 'contact_phone', 'confirmed','finished'],
            include: [
                {
                    model:User_Car,as:'user_car', 
                    attributes:['color','plate'], 
                    include:[
                        {
                            model:Car, as:'car', 
                            attributes:['brand','model','release_year']
                        }
                    ]
                }
            ],
            where: {id:req.params.procId}
        })
    if(user_procedure === null)
    {
        return res.status(404).json({ error: "Element not found!"});
    }
    else
    {
        console.log(user_procedure);
        res.status(200).send(JSON.stringify(user_procedure, null, 2))
    }
    
});

router.get('/', async function(req, res) {
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
