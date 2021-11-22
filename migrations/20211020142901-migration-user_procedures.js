'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
    await queryInterface.createTable('User_Procedures',{
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
      procedureId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'Procedures',
          key: 'id'
        }
      },
      user_carId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'User_Cars',
          key: 'id'
        }
      },
      cost: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true
      },
      summary: {
        type: Sequelize.DataTypes.STRING(1024),
        allowNull: true
      },
      start_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      contact_phone: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true
      },
      confirmed: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
      },
      finished: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
      }
    }, {
      Sequelize,
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

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('users');

  }
};
