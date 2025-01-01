const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Roles = require('./r_h-roles.js');
const Empleado = require ('./empleados.js');

const Usuarios = sequelize.define('Usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_de_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_rol:{
    type: DataTypes.INTEGER,
    references:{
        model: Roles,
        key: 'id_rol',
    }
  },
  id_empleado: {
    type: DataTypes.INTEGER,
    references : {
        model: Empleado,
        key: 'id_empleado',
    },
  },
}, {
  tableName: 'usuarios',
  schema:'recursos_humanos',
  timestamps: false,
});

Usuarios.belongsTo(Roles, {
  foreignKey: 'id_rol',
  as: 'rol',
  schema: 'recursos_humanos'
});

Usuarios.belongsTo(Empleado, {
  foreignKey: 'id_empleado',
  as: 'empleado',
  schema: 'recursos_humanos'
});


module.exports = Usuarios;