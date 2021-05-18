const {Model, DataTypes} = require('sequelize');
const postgres = require('../sequelize/postgres');

class Aplication extends Model {}

Aplication.init({
    aplication_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    aplication_description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    creation_date: DataTypes.DATE,
    user_created: DataTypes.INTEGER,
    updated_date: DataTypes.DATE,
    user_updated: DataTypes.INTEGER         
}, {sequelize: postgres, schema: "auth", modelName: "aplications",timestamps: false});

module.exports = Aplication;