//'use strict';
const sequelize = require('../database_connection');

const { Model, DataTypes } = require('sequelize');

// TODO > Controle Associations
class Comment extends Model {
  static associate(models) {
    // define association here
    models.Comment.belongsTo(models.User, {
      foreigneKey: {
        allowNull: false
      }
    });
    models.Comment.belongsTo(models.Post, {
      foreigneKey: {
        allowNull: false
      }
    })
  }
};
Comment.init({
  idUSERS:
  {
    type: DataTypes.INTEGER,
    allowNull: false //Json
  },
  idPOSTS:
  {
    type: DataTypes.INTEGER,
    allowNull: false //Json
  },
  comment:
  {
    type: DataTypes.STRING,
    allowNull: false //Json
  }
}, {
  sequelize,
  modelName: 'Comment',
});

module.exports = Comment