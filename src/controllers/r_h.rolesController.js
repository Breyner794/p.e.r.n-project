const Roles = require('../models/r_h-roles.js');

const getAllRoles = async (req, res) => {
    try {
        const rol = await Roles.findAll();
        res.json(rol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRoles = async (req,res) =>{
    try{
        const {nombre_rol} = req.body;
        const newRol = await Roles.create({nombre_rol});
        res.status(201).json(newRol);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

  const updateRoles = async (req, res) => {
    try {
      const { id_rol } = req.params;
      const { nombre_rol} = req.body;
      const Rol = await Roles.findByPk(id_rol);
      if (Rol) {
        Rol.nombre_rol = nombre_rol;
        await Rol.save();
        res.json(Rol);
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteRoles = async (req, res) => {
    try {
      const { id_rol } = req.params;
      const Rol = await Roles.findByPk(id_rol);
      if (Rol) {
        await Rol.destroy();
        res.json({ message: 'Rol eliminado' });
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    getAllRoles,
    createRoles,
    updateRoles,
    deleteRoles,
  };