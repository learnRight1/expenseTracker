const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables

const { DB_USER, DB_PASS, DB_NAME, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;
