const Aeropuertos = require('../../models/OperacionesModels/aeropuertos.js');

const getAllAeropuertos = async(req, res) =>{
    try {
        const getAeropuerto = await Aeropuertos.findAll();
        res.json(getAeropuerto);
    } catch (error){
        res.status (500).json({error: error.message, 
            details: process.env.NODE_ENV === 'development' ? error.stack: undefined})
    }
};

const createAeropuerto = async(req, res) => {
    try{
        const { nombre, ciudad, pais, codigo_iata } = req.body;

        if (!nombre || !ciudad || !pais || !codigo_iata){
            return res.status(400).json({
                error: 'Todos los campos son requeridos: nombre, ciudad, país, código IATA'
            });
        }

        const iataRegex = /^[A-Z]{3}$/;
        if (!iataRegex.test(codigo_iata)) {
            return res.status(400).json({
                error: 'El código IATA debe contener exactamente 3 letras mayúsculas'
            });
        }

        const validateiata = await Aeropuertos.findOne({
            where: {
                codigo_iata: codigo_iata
            }
        });

        if (validateiata){
            return res.status(400).json({
                error: 'Este codigo IATA esta registrado por favor valide los codigos existentes.'
            });
        };

        const newAeropuerto = await Aeropuertos.create({
            nombre,
            ciudad,
            pais,
            codigo_iata
        });
        res.status(201).json({
            message: 'Aeropuerto creado exitosamente',
            Aeropuertos: newAeropuerto,
        });

    }catch (error) {
        // Manejar errores específicos de la base de datos
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'El código IATA ya existe. El código IATA debe ser único para cada aeropuerto.'
            });
        }

        // Manejar errores de validación
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Error de validación',
                detalles: error.errors.map(err => err.message)
            });
        }

        // Registrar el error para depuración
        console.error('Error al crear aeropuerto:', error);

        // Respuesta de error genérica
        return res.status(500).json({
            error: 'Error interno del servidor al crear el aeropuerto'
        });
    }
};

const deleteaeropuerto = async (req, res) =>{
    try{
        const {id_aeropuerto} = req.params;
        const aeropuerto = await Aeropuertos.findByPk(id_aeropuerto);
        if(aeropuerto){
            await aeropuerto.destroy();
            res.json({ message: 'Se ha eliminado',
                Aeropuertos: aeropuerto,
            });
        }else {
            res.status(404).json({error: 'Aeropuerto no encontrado'});
        }
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

const updateAeropuerto = async (req, res) => {
    try{
        const {id_aeropuerto} = req.params;
        const { nombre, ciudad, pais, codigo_iata } = req.body;
        const aeropuerto = await Aeropuertos.findByPk(id_aeropuerto);
        if(aeropuerto){
            aeropuerto.nombre = nombre;
            aeropuerto.ciudad = ciudad;
            aeropuerto.pais = pais;
            aeropuerto.codigo_iata = codigo_iata;
            await aeropuerto.save();
            res.json({message: 'Se actualizo el registro EXITOSAMENTE!',
                Aeropuertos: aeropuerto,
            });
        }else {
            res.status(404).json({eror: 'No se encontro el Aeropuerto.'});
        }
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    getAllAeropuertos,
    createAeropuerto,
    deleteaeropuerto,
    updateAeropuerto,
};