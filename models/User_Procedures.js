const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_Procedures', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    procedure_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Procedures',
        key: 'id'
      }
    },
    user_car_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'User_Cars',
        key: 'id'
      }
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    summary: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    contact_phone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    confirmed: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    finished: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'User_Procedures',
    timestamps: false,
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "procedure_id",
        using: "BTREE",
        fields: [
          { name: "procedure_id" },
        ]
      },
      {
        name: "user_car_id",
        using: "BTREE",
        fields: [
          { name: "user_car_id" },
        ]
      },
    ],
    underscored: true
  });
};
