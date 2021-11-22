const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_Procedure_Notifications', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_procedureId : {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User_Procedures',
        key: 'id'
      }
    },
    notificationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Notifications',
        key: 'id'
      }
    },
    additional_info: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'User_Procedure_Notifications',
    defaultScope: {
      attributes: { exclude: ['user_procedureId', 'notificationId'] }},
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_procedureId",
        using: "BTREE",
        fields: [
          { name: "user_procedureId" },
        ]
      },
      {
        name: "notificationId",
        using: "BTREE",
        fields: [
          { name: "notificationId" },
        ]
      },
    ],
  });
};
