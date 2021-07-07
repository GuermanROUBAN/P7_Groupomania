'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    idUSERS: DataTypes.INTEGER,
    idPOSTS: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};