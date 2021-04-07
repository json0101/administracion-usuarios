const { Model, DataTypes} = require('sequelize');
const postgres = require('../sequelize/postgres');
const Role = require('../models-sequelize/role-seq');

class Usuario extends Model {}

Usuario.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  role_id: DataTypes.INTEGER,
  active: DataTypes.BOOLEAN,
  creation_date: DataTypes.DATE,
  user_created: DataTypes.INTEGER,
  updated_date: DataTypes.DATE,
  user_updated: DataTypes.INTEGER
}, { sequelize: postgres, schema: "auth", modelName: 'users', timestamps: false });

Usuario.hasMany(Role,{
  foreignKey: 'role_id'
});

module.exports = Usuario;

