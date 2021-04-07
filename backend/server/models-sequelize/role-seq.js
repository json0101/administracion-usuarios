const {Model, DataTypes} = require('sequelize');
const postgres = require('../sequelize/postgres');

class Role extends Model {}

Role.init({
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    creation_date: DataTypes.DATE,
    user_created: DataTypes.INTEGER,
    updated_date: DataTypes.DATE,
    user_updated: DataTypes.INTEGER
}, {sequelize: postgres, schema: "auth", modelName: "roles",timestamps: false});

module.exports = Role;