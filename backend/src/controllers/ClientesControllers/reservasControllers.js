const Reservas = require('../../models/ClientesModels/reservas.js');
const Pasajeros = require('../../models/ClientesModels/pasajeros.js');
const Vuelos = require('../../models/OperacionesModels/vuelos.js');
const { get } = require('../../routes/empleadosRoutes.js');

const getReserva = async (req, res) => {
    try {
        const getReserva = await Reservas.findAll({
            include: [{
                model: Pasajeros,
                as: 'pasajero'
            }, {
                model: Vuelos,
                as: 'vuelo'
            }]
        });
        res.json(getReserva);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        })
    }
}

const createReserva = async (req, res) => {

    try {
        const { id_pasajero, id_vuelo, fecha_de_reserva, clase, estado_de_la_reserva } = req.body;

        if (!id_pasajero || !id_vuelo || !fecha_de_reserva || !clase || !estado_de_la_reserva) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const newReserva = await Reservas.create({
            id_pasajero,
            id_vuelo,
            fecha_de_reserva,
            clase,
            estado_de_la_reserva
        });

        const reservaConRelacion = await Reservas.findByPk(newReserva.id_reserva, {
            include: [{
                model: Pasajeros,
                as: 'pasajero'
            }, {
                model: Vuelos,
                as: 'vuelo'
            }]
        });

        return res.status(201).json({
            success: true,
            message: 'Reserva creada exitosamente',
            data: reservaConRelacion
        });
    }
    catch (error) {
        // Manejar errores de validación
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        // Otros errores
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const deleteReserva = async (req, res) => {
    try {
        const { id_reserva } = req.params;
        const deleteReserva = await Reservas.findByPk(id_reserva, {
            include: [{
                model: Pasajeros,
                as: 'pasajero'
            }, {
                model: Vuelos,
                as: 'vuelo'
            }]
        });

        if (!deleteReserva) {
            res.status(404).json({ error: 'Reserva no encontrada' });
        }

        const reservaData = deleteReserva.toJSON();

        await deleteReserva.destroy();

        return res.status(200).json({
            success: true,
            mensaje: 'Reserva eliminada exitosamente',
            data: reservaData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateReserva = async (req, res) => {
    try {
        const { id_reserva } = req.params;
        const { id_pasajero, id_vuelo, fecha_de_reserva, clase, estado_de_la_reserva } = req.body;
        
        const reserva = await Reservas.findByPk(id_reserva);
        
        if (!reserva) {
            return res.status(404).json({ 
                success: false,
                error: 'Reserva no encontrada' 
            });
        }

        // Actualizar los campos
        reserva.id_pasajero = id_pasajero;
        reserva.id_vuelo = id_vuelo;
        reserva.fecha_de_reserva = fecha_de_reserva;
        reserva.clase = clase;
        reserva.estado_de_la_reserva = estado_de_la_reserva;
        
        await reserva.save();

        // Obtener la reserva actualizada con sus relaciones
        const reservaConRelaciones = await Reservas.findByPk(reserva.id_reserva, {
            include: [{
                model: Pasajeros,
                as: 'pasajero'
            }, {
                model: Vuelos,
                as: 'vuelo'
            }]
        });

        // Forma correcta de enviar la respuesta
        return res.status(200).json({
            success: true,
            data: reservaConRelaciones
        });

    } catch (error) {
        // Manejar errores de validación
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        // Otros errores
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getReservaOne = async (req, res) => {
    try {
        const { id_reserva } = req.params;
        const getOneReserva = await Reservas.findByPk(id_reserva,{
            include: [{
                model: Pasajeros,
                as: 'pasajero'
            }, {
                model: Vuelos,
                as: 'vuelo'
            }]
        });
        if (!getOneReserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.json(getOneReserva);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

module.exports = {
    getReserva,
    createReserva,
    deleteReserva,
    updateReserva,
    getReservaOne
};
