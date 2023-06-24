const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//JAWSDB_URL is env var commonly used in hosting platform. We need this for heroku.
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else { //If JAWSDB_URL is not set, we resort to using our local mysql db.
  sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);
}

module.exports = sequelize;