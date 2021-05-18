
const {Sequelize} = require('sequelize');

const postgres = new Sequelize('users', 'postgres', 'root', {
    dialect: 'postgres',
    host: 'localhost',
    timezone: '-06:00'
  });
  
module.exports = postgres;