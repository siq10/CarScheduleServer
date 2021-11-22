'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
     await queryInterface.createTable('Tutorials', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      chapter: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "General"
      },
      title: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false
      },
      content: {
        type: Sequelize.DataTypes.STRING(2024),
        allowNull: true
      },
      url: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: true
      },
      difficulty: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: true
      }
    }, {
      Sequelize,
      tableName: 'Tutorials',
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
     await queryInterface.dropTable('Tutorials');

  }
};
