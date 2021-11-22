'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
     await queryInterface.createTable('Procedures', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true
      },
      workload: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'Procedures',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ],
        },
      ],
  
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     */
     await queryInterface.dropTable('Procedures');

  }
};
