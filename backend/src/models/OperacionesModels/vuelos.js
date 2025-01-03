const { DataTypes} = require('sequelize');
const sequelize = require('../../db.js');
const Aeropuertos = require('../OperacionesModels/aeropuertos.js');
const Aviones = require('../OperacionesModels/aviones.js');

const Vuelos = sequelize.define('vuelo',{
    id_vuelo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numero_de_vuelo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    origen: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    destino: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_hora_salida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_hora_llegada:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isAfter(value) {
                if (value < this.fecha_hora_salida) {
                    throw new Error('La fecha de llegada debe ser posterior a la salida');
                }
            }
        }
    },
    estado_vuelo:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn:{
                args: [['En Espera',
                     'Abordando',
                     'Programado',
                     'Puerta Cerrada',
                     'En Taxi',
                     'En vuelo',
                     'Aterrizado',
                     'En puerta',
                     'Cancelado',
                     'Retrasado']],
                     msg :'Debes de marcar los siguientes estados En Espera, Abordando, Programado, Puerta Cerrada, En Taxi, En vuelo, Aterrizado, En puerta, Cancelado, Retrasado'
            }
        }
    },
    id_avion:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'vuelos',
    schema: 'operaciones',
    timestamps: false,
});

Vuelos.belongsTo(Aeropuertos,{
    foreignKey: 'origen',
    as:'aeropuertoOrigen',
    targetKey: 'id_aeropuerto',
    schema: 'operaciones',
});

Vuelos.belongsTo(Aeropuertos,{
    foreignKey: 'destino', // El campo en tu tabla Vuelos
    as:'aeropuertoDestino', // El campo en la tabla Aeropuertos
    targetKey: 'id_aeropuerto',
    schema: 'operaciones',
});

Vuelos.belongsTo(Aviones,{
    foreignKey: 'id_avion',
    as:'avion',
    schema: 'operaciones',
});

module.exports = Vuelos;