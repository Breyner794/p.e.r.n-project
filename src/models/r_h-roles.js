const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');

const Roles = sequelize.define('roles', {
    id_rol: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nombre_rol:{
        type:DataTypes.STRING,
        allowNull: false,
    },
  },{ tableName: 'roles',
    schema: 'recursos_humanos',
    timestamps: false,
});

module.exports = Roles;