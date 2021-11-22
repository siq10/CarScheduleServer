'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     */
     await queryInterface.createTable('Notifications', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.DataTypes.ENUM('error','warning','info','success'),
        allowNull: true
      },
      message: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: true
      }
    }, {
      Sequelize,
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
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     */
     await queryInterface.dropTable('Notifications');

  }
};
