const Equipajes = require('../../models/ClientesModels/equipaje.js');
const Reserva = require('../../models/ClientesModels/reservas.js');

const getEquipaje = async (req, res) => {
    try {
        const getEquipaje = await Equipajes.findAll();
        res.json(getEquipaje);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        })
    }
};

const deleteEquipaje = async (req, res) => {
    try {
        const { id_equipaje } = req.params;
        const deleteEquipaje = await Equipajes.findByPk(id_equipaje, {
            include: [{
                model: Reserva,
                as: 'reserva'
            }],
        });

        if (!deleteEquipaje) {
            res.status(404).json({ error: 'Equipaje no Encontrado' });
        }
        const equipajeData = deleteEquipaje.toJSON();

        await deleteEquipaje.destroy();

        return res.status(200).json({
            success: true,
            mensaje: 'Equipaje eliminado exitosamente',
            data: equipajeData
        });
    } catch (error) {
        res.status(500).json({ error: error.message, details: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
};

const createEquipaje = async (req, res) => {
    try {
        const { id_reserva, peso, tipo, longitud, ancho, altura } = req.body;

        const reservaexistente = await Reserva.findOne({
            where: {id_reserva}
        });
        
        if (!reservaexistente) {
            return res.status(404).json({ error: 'La reserva no existe' });
        } 

        if (!id_reserva || !peso || !tipo || !longitud || !ancho || !altura) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const newEquipaje = await Equipajes.create({
            id_reserva,
            peso,
            tipo,
            longitud,
            ancho,
            altura
        });

        const equipajeConRelacion = await Equipajes.findByPk(newEquipaje.id_equipaje, {
            include: [{
                model: Reserva,
                as: 'reserva'
            }]
        });

        return res.status(201).json({
            success: true,
            message: 'Equipaje creado exitosamente',
            data: equipajeConRelacion
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEquipaje = async (req, res) => {
    try {
        const { id_equipaje } = req.params;
        const { id_reserva, peso, tipo, longitud, ancho, altura } = req.body;
        const equipaje = await Equipajes.findByPk(id_equipaje);
        if (equipaje) {
            equipaje.id_reserva = id_reserva;
            equipaje.peso = peso;
            equipaje.tipo = tipo;
            equipaje.longitud = longitud;
            equipaje.ancho = ancho;
            equipaje.altura = altura;
            await equipaje.save();
            res.json(equipaje);
        } else {
            res.status(404).json({ error: 'Equipaje no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {
    getEquipaje,
    createEquipaje,
    updateEquipaje,
    deleteEquipaje,
};