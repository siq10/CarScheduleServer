'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
     await queryInterface.createTable('User_Cars', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      carId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'Cars',
          key: 'id'
        }
      },
      color: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: true
      },
      plate: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
      }
    }, {
      Sequelize,
      tableName: 'User_Cars',
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
          name: "carId",
          using: "BTREE",
          fields: [
            { name: "carId" },
          ]
        },
      ],
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     */
    await queryInterface.dropTable('User_Cars');

  }
};
