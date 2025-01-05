const { DataTypes} = require('sequelize');
const sequelize = require('../../db.js');

const Pasajeros = sequelize.define('pasajero',{
    id_pasajero: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nacionalidad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pasaporte: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contacto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dni:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,   
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
},{
    tableName: 'pasajeros',
    schema: 'clientes',
    timestamps: false,
});

module.exports = Pasajeros;