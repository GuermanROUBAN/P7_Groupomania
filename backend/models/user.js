// 'use strict';

const sequelize = require('../database_connection');


const { Model, DataTypes } = require('sequelize');

class User extends Model { // user c'est le model
  // static associate(models) { // fonction static
  //   // define association here
  //   models.User.hasMany(models.Post, models.Comment);
  // }
};
User.init({
  email: {
    type: DataTypes.STRING,
    allowNull:false //Json
  },
  username:
  {
    type: DataTypes.STRING,
    allowNull:false //Json
  },  
  password: {
    type: DataTypes.STRING,
    allowNull:false //Json
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull:false //Json
  }, 
}, {
  sequelize, // on renvoi à la BDD
  modelName: 'User',
});

module.exports = User