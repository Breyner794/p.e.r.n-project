const { DataTypes} = require('sequelize');
const sequelize = require('../../db.js');

const Aeropuertos = sequelize.define('aeropuerto',{
    id_aeropuerto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo_iata: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    tableName: 'aeropuertos',
    schema: 'operaciones',
    timestamps: false,
});

module.exports = Aeropuertos;