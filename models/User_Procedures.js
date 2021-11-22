const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_Procedures', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    procedureId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Procedures',
        key: 'id'
      }
    },
    user_carId: {
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
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "procedureId",
        using: "BTREE",
        fields: [
          { name: "procedureId" },
        ]
      },
      {
        name: "user_carId",
        using: "BTREE",
        fields: [
          { name: "user_carId" },
        ]
      },
    ],
  });
};
