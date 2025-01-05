const { DataTypes} = require('sequelize');
const sequelize = require('../../db.js');
const Pasajeros = require('./pasajeros.js');
const Vuelos = require('../OperacionesModels/vuelos.js');

const Reservas = sequelize.define('reserva',{

    id_reserva: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_pasajero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_vuelo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_de_reserva: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            async fechaReservaValida(value) {
                // Obtenemos el vuelo asociado a esta reserva
                const vuelo = await Vuelos.findByPk(this.id_vuelo);
                
                if (!vuelo) {
                    throw new Error('El vuelo especificado no existe');
                }

                // Convertimos las fechas a objetos Date para comparar
                const fechaReserva = new Date(value);
                const fechaSalida = new Date(vuelo.fecha_hora_salida);

                if (fechaReserva > fechaSalida) {
                    throw new Error('La fecha de reserva no puede ser posterior a la fecha de salida del vuelo');
                }
            }
        }
    },
    clase:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn:{
                args: [['Economico', 'Business', 'Primera']],
                msg: 'Clase no definida marque las clases disponibles Económico, Business, First'
            }
        }
    },
    estado_de_la_reserva: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn:{
                args: [['Reservado', 'Cancelado', 'Abordado']],
                msg: 'Estado de la reserva no definido marque los estados disponibles Reservado, Cancelado, Abordado'
            }
        }
    },
},{
    tableName: 'reservas',
    schema: 'clientes',
    timestamps: false,
});

Reservas.belongsTo(Pasajeros, {   
    foreignKey: 'id_pasajero',
    as: 'pasajero',
    schema: 'clientes',
});

Reservas.belongsTo(Vuelos,{
    foreignKey: 'id_vuelo',
    as: 'vuelo',
    schema: 'operaciones',
});

module.exports = Reservas;