'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
    await queryInterface.createTable('Cars', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      brand: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: true
      },
      model: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      release_year: {
        type: "YEAR",
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'Cars',
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
     */
     await queryInterface.dropTable('Cars');

  }
};
