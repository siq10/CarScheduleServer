'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
    await queryInterface.createTable('Users', 
    {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
        unique: "username"
      },
      password: {
        type: Sequelize.DataTypes.STRING(72),
        allowNull: true
      },  
      email: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: true,
        unique: "email"
      }
    }, {
      Sequelize,
      tableName: 'Users',
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
          name: "username",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "username" },
          ]
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "email" },
          ]
        },
      ],
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     */
    await queryInterface.dropTable('Users');
  }
};
