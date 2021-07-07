'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUSERS: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {//pour notre association on modifie idUSERS
          model: 'Users',
          key:'id' // identifiant de l'utilisateur
        }
      },
      idPOSTS: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {//pour notre association on modifie idUSERS
          model: 'Posts',
          key:'id' // identifiant de l'utilisateur
        }
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};