// 'use strict';
const sequelize = require('../database_connection');

const { Model, DataTypes } = require('sequelize');

// TODO > Controle Associations
class Post extends Model {
  static associate(models) {
    // define association here
    models.Post.belongsTo(models.User, { // post s'attache au user
      foreigneKey: { // ou la mettre?
        allowNull: false
      }
    })
  };
}
Post.init({
  idUSERS:
  {
    type: DataTypes.INTEGER,
    allowNull: false //Json
  },
  title:
  {
    type: DataTypes.STRING,
    allowNull: false //Json
  },
  content:
  {
    type: DataTypes.STRING,
    allowNull: false //Json
  },
  attachement:
  {
    type: DataTypes.STRING,
    allowNull: false //Json
  }
}, {
  sequelize,
  modelName: 'Post',
});

module.exports = Post
