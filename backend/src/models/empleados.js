const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Empleado = sequelize.define('Empleado', {
  id_empleado: {
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
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_contratacion:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'empleados',
  schema:'recursos_humanos',
  timestamps: false,
});

module.exports = Empleado;