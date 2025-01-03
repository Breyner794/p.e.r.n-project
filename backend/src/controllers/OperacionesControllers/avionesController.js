const Aviones = require('../../models/OperacionesModels/aviones.js');

const getAllAviones = async(req, res) =>{
    try {
        const getAviones = await Aviones.findAll();
        res.json(getAviones);
    } catch (error){
        res.status (500).json({error: error.message, 
            details: process.env.NODE_ENV === 'development' ? error.stack: undefined})
    }
};

const createAvion = async(req, res) => {
    try{
        const { modelo, capacidad, year_fabricacion, estado_avion } = req.body;

        if (!modelo || !capacidad || !year_fabricacion || !estado_avion){
            return res.status(400).json({
                error: 'Todos los campos son requeridos: nombre, ciudad, país, código IATA'
            });
        }

        const newAvion = await Aviones.create({
            modelo,
            capacidad,
            year_fabricacion,
            estado_avion
        });
        res.status(201).json({
            message: 'Avion creado exitosamente',
            Aviones: newAvion,
        });

    }catch (error) {

        // Manejar errores de validación
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Error de validación',
                detalles: error.errors.map(err => err.message)
            });
        }

        // Registrar el error para depuración
        console.error('Error al crear avion:', error);

        // Respuesta de error genérica
        return res.status(500).json({
            error: 'Error interno del servidor al crear un avion'
        });
    }
};

const deleteAvion = async (req, res) =>{
    try{
        const {id_avion} = req.params;
        const avion = await Aviones.findByPk(id_avion);
        if(avion){
            await avion.destroy();
            res.json({ message: 'Se ha eliminado',
                Aviones: avion,
            });
        }else {
            res.status(404).json({error: 'Avion no encontrado'});
        }
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

const updateAvion = async (req, res) => {
    try{
        const {id_avion} = req.params;
        const { modelo, capacidad, year_fabricacion, estado_avion } = req.body;
        const avion = await Aviones.findByPk(id_avion);
        if(avion){
            avion.modelo = modelo;
            avion.capacidad = capacidad;
            avion.year_fabricacion = year_fabricacion;
            avion.estado_avion = estado_avion;
            await avion.save();
            res.json({message: 'Se actualizo el registro EXITOSAMENTE!',
                Aviones: avion,
            });
        }else {
            res.status(404).json({eror: 'No se encontro el avion.'});
        }
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    getAllAviones,
    createAvion,
    deleteAvion,
    updateAvion,
};