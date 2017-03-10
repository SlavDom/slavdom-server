import helper from './_modelHelper';
const bcrypt = require('bcrypt-nodejs');

export function init(sequelize, DataTypes) {
    let fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING
        },
        language: {
            type: DataTypes.STRING
        },
        result: {
            type: DataTypes.STRING
        }
    };

    let options = {
    };

    return helper.defineModel('translation', fields, options, sequelize);
}