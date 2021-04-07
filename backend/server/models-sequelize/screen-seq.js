const {Model, DataTypes} = require('sequelize');
const postgres = require('../sequelize/postgres');

class Screen extends Model {}

Screen.init({
    screen_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    screen_description: DataTypes.STRING,
    aplication_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    creation_date: DataTypes.DATE,
    user_created: DataTypes.INTEGER,
    updated_date: DataTypes.DATE,
    user_updated: DataTypes.INTEGER
}, {sequelize: postgres, schema: "auth", modelName: "screens",timestamps: false});

module.exports = Screen;