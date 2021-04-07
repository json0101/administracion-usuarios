
const {Sequelize} = require('sequelize');

const postgres = new Sequelize('admin_users', 'postgres', 'jolteon20', {
    dialect: 'postgres',
    host: 'localhost',
    timezone: '-06:00'
  });
  
module.exports = postgres;