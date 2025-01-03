const { DataTypes} = require('sequelize');
const sequelize = require('../../db.js');
const Vuelos = require('../OperacionesModels/vuelos.js')
const Empleado = require('../../models/empleados.js')

const Tripulacion = sequelize.define('tripulacion',{
    id_tripulacion:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
    },
    id_vuelo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rol:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn:{
                args: [['Capitán',
                     'Primer Oficial',
                     'TCP',
                     'Sobrecargo',
                     'Ingeniero de Vuelo']],
                     msg :'Rol no definido marque los roles disponibles Capitán, Primer Oficial, TCP, Sobrecargo, Ingeniero de Vuelo'
            }
        }
    },
    
},{
    tableName: 'tripulacion_vuelo',
    schema: 'operaciones',
    timestamps: false,
});

Tripulacion.belongsTo(Empleado,{
    foreignKey: 'id_empleado',
    as:'empleado',
    schema: 'operaciones',
});

Tripulacion.belongsTo(Vuelos,{
    foreignKey: 'id_vuelo', 
    as:'vuelo', 
    schema: 'operaciones',
});


module.exports = Tripulacion;