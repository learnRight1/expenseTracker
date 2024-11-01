'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs'); // Make sure bcrypt is imported

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User', // Use PascalCase here
    }
  );

  // Hash password before saving
  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
