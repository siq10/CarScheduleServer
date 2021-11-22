'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
    await queryInterface.createTable('User_Procedure_Notifications', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      user_procedureId : {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'User_Procedures',
          key: 'id'
        }
      },
      notificationId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Notifications',
          key: 'id'
        }
      },
      additional_info: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE

    }, {
      Sequelize,
      tableName: 'User_Procedure_Notifications',
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
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     */
    await queryInterface.dropTable('User_Procedure_Notifications');

  }
};
