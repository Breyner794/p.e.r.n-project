const Roles = require('../models/r_h-roles.js');
const Empleado = require('../models/empleados.js');
const Usuarios = require('../models/r_h.usuarios.js');

const getAllUsuarios = async (req, res) => {
    try {
        const getUsuario = await Usuarios.findAll({
            include:[
                { 
                    model: Roles,
                    as: 'rol'  
                },
                { 
                    model: Empleado,
                    as: 'empleado'  
                }
            ]
        });
        res.json(getUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
      const { nombre_de_usuario, password, email, id_rol, id_empleado } = req.body;
  
    //   Verificar si existe el rol
      const rolExistente = await Roles.findByPk(id_rol);
      if (!rolExistente) {
        return res.status(404).json({ error: 'El rol especificado no existe' });
      }
  
    //   Verificar si existe el empleado
      const empleadoExistente = await Empleado.findByPk(id_empleado);
      if (!empleadoExistente) {
        return res.status(404).json({ error: 'El empleado especificado no existe' });
      }
  
    //   Crear el usuario con las referencias
      const newUsuario = await Usuarios.create({
        nombre_de_usuario,
        password,
        email,
        id_rol,
        id_empleado
      });
  
    //   Cargar los datos relacionados para la respuesta
      const usuarioConRelaciones = await Usuarios.findByPk(newUsuario.id_usuario, {
        include: [
          { model: Roles, as: 'rol' },
          { model: Empleado, as: 'empleado' }
        ]
      });
  
      res.status(201).json(usuarioConRelaciones);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
          error: 'El nombre de usuario o email ya existe' 
        });
      }
      res.status(500).json({ error: error.message, 
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined});
    }
};

const getUsuariosById = async(req, res) =>{
    try{
        const {id_usuario} = req.params;
        const Usuario = await Usuarios.findByPk(id_usuario,{
            include:[
                { 
                    model: Roles,
                    as: 'rol'  // Este debe coincidir con el alias que definiste en las relaciones
                },
                { 
                    model: Empleado,
                    as: 'empleado'  // Este debe coincidir con el alias que definiste en las relaciones
                }
            ] 
        });
        if (!Usuario){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        res.status(200).json(Usuario);
    }catch (error){
        res.status(500).json({error: error.message, 
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined});
    }
};

const deleteUsuario = async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const usuario = await Usuarios.findByPk(id_usuario);
      if (usuario) {
        await usuario.destroy();
        res.json({ message: 'Empleado eliminado' });
      } else {
        res.status(404).json({ error: 'Empleado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports={
    getUsuariosById,
    getAllUsuarios,
    createUsuario,
    deleteUsuario,
};