const {DataTypes} = require('sequelize');
const sequelize = require('../../db.js');
const Reserva = require('./reservas.js');

const Equipajes = sequelize.define('equipaje',{

    id_equipaje: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_reserva: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    peso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitud: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    ancho: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    altura: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
},{
    tableName: 'equipaje',
    schema: 'clientes',
    timestamps: false,
});

Equipajes.belongsTo(Reserva,{
    foreignKey: 'id_reserva',
    as: 'reserva',
    schema: 'clientes',
});

module.exports = Equipajes;
