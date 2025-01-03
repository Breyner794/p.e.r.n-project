const { DataTypes} = require('sequelize');
const sequelize = require('../../db.js');

const Aviones = sequelize.define('avion',{
    id_avion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year_fabricacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado_avion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn:{
                args: [['Pendiente', 'Operativo', 'En Mantenimiento']],
                msg: 'El estado debe ser: Pendiente, Operativo o En Mantenimiento'
            }
        }
    }
},{
    tableName: 'aviones',
    schema: 'operaciones',
    timestamps: false,
});

module.exports = Aviones;