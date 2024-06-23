const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    // Ensure this matches the MySQL server's charset
    charset: 'utf8mb4',
    // This enables support for emoji in the database
    collate: 'utf8mb4_unicode_ci',
    // Support for multiple statements in one query (e.g., batch inserts)
    multipleStatements: true,
  },
});

module.exports = sequelize;
