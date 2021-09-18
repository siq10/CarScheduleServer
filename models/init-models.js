var DataTypes = require("sequelize").DataTypes;
var _Cars = require("./Cars");
var _Procedures = require("./Procedures");
var _Secrets = require("./Secrets");
var _Tutorials = require("./Tutorials");
var _User_Cars = require("./User_Cars");
var _User_Procedures = require("./User_Procedures");
var _Users = require("./Users");

function initModels(sequelize) {
  var Cars = _Cars(sequelize, DataTypes);
  var Procedures = _Procedures(sequelize, DataTypes);
  var Secrets = _Secrets(sequelize, DataTypes);
  var Tutorials = _Tutorials(sequelize, DataTypes);
  var User_Cars = _User_Cars(sequelize, DataTypes);
  var User_Procedures = _User_Procedures(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  User_Cars.belongsTo(Cars, { as: "car", foreignKey: "car_id"});
  // Cars.hasMany(User_Cars, { as: "User_Cars", foreignKey: "car_id"});
  User_Procedures.belongsTo(Procedures, { as: "procedure", foreignKey: "procedure_id"});
  // Procedures.hasMany(User_Procedures, { as: "User_Procedures", foreignKey: "procedure_id"});
  User_Procedures.belongsTo(User_Cars, { as: "user_car", foreignKey: "user_car_id"});
  User_Cars.hasMany(User_Procedures, { as: "user_procedures", foreignKey: "user_car_id"});
  User_Cars.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  // Users.hasMany(User_Cars, { as: "User_Cars", foreignKey: "user_id"});
  User_Procedures.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  // Users.hasMany(User_Procedures, { as: "User_Procedures", foreignKey: "user_id"});


  Users.belongsToMany(Procedures, {through: User_Procedures})
  Procedures.belongsToMany(Users, {through: User_Procedures})
  Users.belongsToMany(Cars, {through: User_Cars})
  Cars.belongsToMany(Users, {through: User_Cars})

  return {
    Cars,
    Procedures,
    Secrets,
    Tutorials,
    User_Cars,
    User_Procedures,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
