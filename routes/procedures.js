var express = require('express');
var router = express.Router();

var User_Procedure = {}
var User = {}
var User_Car = {}
var Procedure = {}
var Car = {}

var jwt = require('jsonwebtoken');

var CryptoServices = require("../rsa/CryptoService")
var CryptoService = CryptoServices.CryptoService
var cs = new CryptoService()

/* GET user-procedures for user with particular id. */



router.post('/', function(req,res,next)
{
  
})

module.exports = (procedures,user_cars,user_procedures,users,cars) =>
{
    Procedure = procedures
    User_Car = user_cars
    User_Procedure = user_procedures
    User = users
    Car = cars
    return router;
} 

// User.findAll({
//     include: [
//       {
//         model: Grant,
//         include: [User, Profile]
//       },
//       {
//         model: Profile,
//         include: {
//           model: User,
//           include: {
//             model: Grant,
//             include: [User, Profile]
//           }
//         }
//       }
//     ]
//   });