var express = require('express');
var router = express.Router({mergeParams: true});

var User_Procedure = {}
var User = {}
var User_Car = {}
var Procedure = {}
var Car = {}
var User_Procedure_Notification = {}
var Notification = {}

const { Sequelize } = require('sequelize');

var jwt = require('jsonwebtoken');

var CryptoServices = require("../../rsa/CryptoService");
const { route } = require('../auths');
const e = require('express');
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
                    model:Procedure, as: "procedure",
                    attributes:['type','description', 'workload']
                },
                {
                    model:User_Car,as:'user_car', 
                    attributes:['color','plate'], 
                    include:[
                        {
                            model:Car, as:'car', 
                            attributes:['brand','model','release_year']
                        }
                    ]
                },
                {
                    model:Notification, 
                    attributes:{exclude:['id']}, 
                    through:{attributes:['id', 'additional_info', 'updatedAt']}, // pivot table attributes.
                }
            ],
            where: {id:req.params.procId},
            order: [[Sequelize.literal('`Notifications->User_Procedure_Notifications`.'), 'updatedAt', 'DESC']]
        })
    if(user_procedure === null)
    {
        return res.status(404).json({ error: "Element not found!"});
    }
    else
    {
        let jsonresult = user_procedure.toJSON()
        jsonresult.Notifications.forEach((element,index,arr) => {
            arr[index] = {...arr[index], ...arr[index].User_Procedure_Notifications}
            delete arr[index].User_Procedure_Notifications
        });
        // console.log(jsonresult);
        res.status(200).send(JSON.stringify(jsonresult, null, 2))
    }
    
});

router.get('/', async function(req, res) {
    const user_procedures = await User_Procedure.findAll(
        { attributes: ['id', 'start_date', 'confirmed'] , include: [
            {model:Procedure, as:'procedure' , attributes: ['type']},
            {model:User_Car,as:'user_car', attributes:['plate'], include: [{model:Car, as:'car', attributes:['brand','model','release_year']}]}
        ], where:{ userId : req.params.userId, finished : 0 }});
    console.log(user_procedures.every(up => up instanceof User_Procedure));
    // const up 
    // console.log()
    res.status(200).send(JSON.stringify(user_procedures, null, 2))
});

/**
 * Updates procedure belonging to a user with fields from request
 * @param
 * procId  id of the operation that would be updated.
 */
router.put('/:procId', async (req, res) => {
    const user_procedure_tobeupdated = await User_Procedure.findByPk(req.params.procId)

    if(user_procedure_tobeupdated !== null && user_procedure_tobeupdated.userId === parseInt(req.params.userId,10))
    {
        let data = {}
        if(req.body.phone)
        {
            data.contact_phone = req.body.phone
        }
        if(req.body.start_date)
        {
            data.start_date = req.body.start_date
        }
        user_procedure_tobeupdated.update(data)
        res.sendStatus(204)
    }
    else
    {
        res.sendStatus(404)
    }
})

/**
 * Updates procedure belonging to a user with fields from request
 * @param
 * procId  id of the operation that would be updated.
 */
 router.put('/:procId', async (req, res) => {
    const user_procedure_tobeupdated = await User_Procedure.findByPk(req.params.procId)

    if(user_procedure_tobeupdated !== null && user_procedure_tobeupdated.userId === parseInt(req.params.userId,10))
    {
        let data = {}
        if(req.body.phone)
        {
            data.contact_phone = req.body.phone
        }
        if(req.body.start_date)
        {
            data.start_date = req.body.start_date
        }
        user_procedure_tobeupdated.update(data)
        res.sendStatus(204)
    }
    else
    {
        res.sendStatus(404)
    }
})

/**
 * Deletes procedure belonging to a user
 * @param
 * procId  id of the operation that would be updated.
 */
 router.delete('/:procId', async (req, res) => {
    const user_procedure_tobeupdated = await User_Procedure.findByPk(req.params.procId)

    if(user_procedure_tobeupdated !== null && user_procedure_tobeupdated.userId === parseInt(req.params.userId,10))
    {
        await user_procedure_tobeupdated.destroy()
        res.sendStatus(200)
    }
    else
    {
        res.sendStatus(404)
    }
})
module.exports = (procedures,user_cars,user_procedures,users,cars, notifications, user_procedure_notifications) =>
{
    Procedure = procedures
    User_Car = user_cars
    User_Procedure = user_procedures
    User = users
    Car = cars
    User_Procedure_Notification = user_procedure_notifications
    Notification = notifications
    return router;
} 
