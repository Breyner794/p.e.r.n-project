const Empleados = require('../models/empleados.js');

//obtener todos los empleados
const getAllEmpleados = async (req, res) => {
    try {
        const empleado = await Empleados.findAll();
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEmpleado = async (req, res) => {
    try {
      const { nombre, apellido, cargo, fecha_contratacion, salario } = req.body;
      const newEmpleado = await Empleados.create({ nombre, apellido, cargo, fecha_contratacion, salario });
      res.status(201).json(newEmpleado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


const getEmpleadoById = async (req, res) => {
    try {
        /*//La const debe de ser igual a la ruta del empleadoRouters, ya que si no es igual va a lanzar un error de empleado no encontrado
        // si la ruta de la API se llama (/empleado/:id) teniendo la const en {id_empleado} entonces no dara fallo ya que no es el mismo nombre de la ruta
        // entonces tener en cuenta que la const sea igual a la ruta de la API*/
      const { id_empleado } = req.params; /* otra opcion seria const id = req.params.id esto te evitas que sea igual router que se configuro.*/
      const empleado = await Empleados.findByPk(id_empleado);
      if (empleado) {
        res.json(empleado);
      } else {
        res.status(404).json({ error: 'Empleado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const updateEmpleado = async (req, res) => {
    try {
      const { id_empleado } = req.params;
      const { nombre, apellido, cargo, fecha_contratacion, salario } = req.body;
      const empleado = await Empleados.findByPk(id_empleado);
      if (empleado) {
        empleado.nombre = nombre;
        empleado.apellido = apellido;
        empleado.cargo = cargo;
        empleado.fecha_contratacion = fecha_contratacion;
        empleado.salario = salario;
        await empleado.save();
        res.json(empleado);
      } else {
        res.status(404).json({ error: 'Empleado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteEmpleado = async (req, res) => {
    try {
      const { id_empleado } = req.params;
      const empleado = await Empleados.findByPk(id_empleado);
      if (empleado) {
        await empleado.destroy();
        res.json({ message: 'Empleado eliminado' });
      } else {
        res.status(404).json({ error: 'Empleado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getAllEmpleados,
    createEmpleado,
    getEmpleadoById,
    updateEmpleado,
    deleteEmpleado,
};

