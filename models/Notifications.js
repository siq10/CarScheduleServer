const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notifications', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('error','warning','info','success'),
      allowNull: true
    },
    message: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Notifications',
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
    ],
  });
};
