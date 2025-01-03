const Empleado = require('../../models/empleados.js');
const Tripulacion = require('../../models/OperacionesModels/tripulacion_vuelo.js');
const Vuelos = require('../../models/OperacionesModels/vuelos.js');

const getAllTripulaciones = async(req, res) =>{
    try{
        const tripulacion = await Tripulacion.findAll();
        res.json(tripulacion)
    }catch(error){
        res.status(500).json ({error: error.message});
    }
};

const getTripulacionBy = async(req ,res) =>{
    try{
        const {id_tripulacion} = req.params;
        const tripulacionbyid = await Tripulacion.findByPk(id_tripulacion,{
            include:[{
                model: Empleado,
                as: 'empleado',
            },{
                model: Vuelos,
                as: 'vuelo',
            }]
        });
            if(!tripulacionbyid){
                return res.status(404).json ({message: 'Tripulacion no encontrada'});
            }
            res.json(tripulacionbyid);
        
    }catch{
        res.status(500).json({ error: error.message, 
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
};

const deleteTripulacion = async (req, res) => {
    try {
      const { id_tripulacion } = req.params;
      const deletetripulacion = await Tripulacion.findByPk(id_tripulacion, {
        include: [{
            model: Empleado,
            as: 'empleado',
        },{
            model: Vuelos,
            as: 'vuelo',
        }],
      });

      if (!deletetripulacion) {
        res.status(404).json({ error: 'Tripulacion de vuelo no Encontrado' });
    }
        
        const tripulacionData = deletetripulacion.toJSON();

        await deletetripulacion.destroy();

        return res.status(200).json({
            success: true,
            mensaje: 'Tripulación eliminada exitosamente',
            data: tripulacionData
        });

    } catch (error) {
      res.status(500).json({ error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
  };

const createTripulacion = async (req, res) => {
    try {
        const {id_empleado, id_vuelo, rol} = req.body;

        const [empleado, vuelo] = await Promise.all([
            Empleado.findByPk(id_empleado),
            Vuelos.findByPk(id_vuelo),
        ]);
        
        if (!empleado || !vuelo) {
            return res.status(404).json({
                success: false,
                mensaje: 'Uno o ambos aeropuertos no existen'
                });
        }

        const newTripulacion = await Tripulacion.create({
            id_empleado, 
            id_vuelo,
            rol,
        });

        const tripulacionConRelaciones = await Tripulacion.findByPk(newTripulacion.id_tripulacion, {
            include: [
                {
                    model: Empleado,
                    as: 'empleado',
                },
                {
                    model: Vuelos,
                    as: 'vuelo',
                },
            ],
        });
        res.status(201).json(tripulacionConRelaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTripulacion = async (req, res) => {
    try {
      const { id_tripulacion } = req.params;
      const {id_empleado, id_vuelo, rol} = req.body;

      const [empleado, vuelo] = await Promise.all([
        Empleado.findByPk(id_empleado),
        Vuelos.findByPk(id_vuelo),
    ]);
    
    if (!empleado) {
        return res.status(404).json({
            success: false,
            mensaje: 'El empleado especificado no existe'
        });
    }

    if (!vuelo) {
        return res.status(404).json({
            success: false,
            mensaje: 'El vuelo especificado no existe'
        });
    }

      const tripulacion = await Tripulacion.findByPk(id_tripulacion);
      if (tripulacion) {
        tripulacion.id_empleado = id_empleado;
        tripulacion.id_vuelo = id_vuelo;
        tripulacion.rol = rol;
        await tripulacion.save();

        const tripulacionupdate = await Tripulacion.findByPk(tripulacion.id_tripulacion, {
            include: [
                {
                    model: Empleado,
                    as: 'empleado',
                },
                {
                    model: Vuelos,
                    as: 'vuelo',
                },
            ],
        });
        res.json(tripulacionupdate);
      } else {
        res.status(404).json({ error: 'Tripulacion no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getAllTripulaciones,
    getTripulacionBy,
    deleteTripulacion,
    createTripulacion,
    updateTripulacion,
};