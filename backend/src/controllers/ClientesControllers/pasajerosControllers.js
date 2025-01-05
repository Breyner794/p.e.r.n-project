const Pasajeros = require('../../models/ClientesModels/pasajeros');

const getPasajeros = async(req, res) =>{
    try {
        const getPasajero = await Pasajeros.findAll();
        res.json(getPasajero);
    } catch (error){
        res.status (500).json({error: error.message, 
            details: process.env.NODE_ENV === 'development' ? error.stack: undefined})
    }
}

const createPasajero = async(req, res) => {
    try{
        const { nombre, apellido, fecha_nacimiento, nacionalidad, pasaporte, contacto, dni, email } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'El email no es válido'
            });
        }

        const emailExistente = await Pasajeros.findOne({
            where: {email}
        });

        const dniExistente = await Pasajeros.findOne({
            where: {dni}
        });

        const pasaporteExistente = await Pasajeros.findOne({
            where: {pasaporte}
        });


        if(pasaporteExistente){
            return res.status(400).json({
                success: false,
                message: 'El pasaporte, ya existe por favor verifica los datos'
            });
        };

        if(dniExistente){
            return res.status(400).json({
                success: false,
                message: 'El DNI, ya existe porfavor verifica los datos'
            });
        };

        if(emailExistente){
            return res.status(400).json({
                success: false,
                message: 'El email ya existe por favor verifica los datos'});
        };

        if (!nombre || !apellido || !fecha_nacimiento || !nacionalidad || !pasaporte || !contacto || !dni || !email){
            return res.status(400).json({
                error: 'Todos los campos son requeridos: nombre, apellido, fecha_nacimiento, nacionalidad, pasaporte, contacto, dni, email'
            });
        };

        const newPasajero = await Pasajeros.create({
            nombre,
            apellido,
            fecha_nacimiento,
            nacionalidad,
            pasaporte,
            contacto,
            dni,
            email
        });
        res.status(201).json({
            message: 'Pasajero creado exitosamente',
            Pasajeros: newPasajero,
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
        console.error('Error al crear pasajero:', error);

        // Respuesta de error genérica
        return res.status(500).json({
            error: 'Error interno del servidor al crear un pasajero'
        });
    }
}
const deletePasajero = async (req, res) =>{
    try{
        const {id_pasajero} = req.params;
        const pasajero = await Pasajeros.findByPk(id_pasajero);
        if(!pasajero){
            res.status(404).json({ error: 'Pasajero no encontrado' });
        }

        const pasajeroData = pasajero.toJSON();

        await pasajero.destroy();

        return res.status(200).json({
            success: true,
            mensaje: 'Pasajero eliminado exitosamente',
            data: pasajeroData
        });

    }catch (error){
        res.status(500).json({ error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
}

const updatePasajero = async (req, res) => {

    try {
        const { id_pasajero } = req.params;
        const { nombre, apellido, fecha_nacimiento, nacionalidad, pasaporte, contacto, dni, email } = req.body;
        const pasajero = await Pasajeros.findByPk(id_pasajero);
        if (pasajero) {
            pasajero.nombre = nombre;
            pasajero.apellido = apellido;
            pasajero.fecha_nacimiento = fecha_nacimiento;
            pasajero.nacionalidad = nacionalidad;
            pasajero.pasaporte = pasaporte;
            pasajero.contacto = contacto;
            pasajero.dni = dni;
            pasajero.email = email;
            await pasajero.save();
            res.json(pasajero);
        } else {
            res.status(404).json({ error: 'Pasajero no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

const getOnePasajero = async(req, res) =>{
    try{
        const {id_pasajero} = req.params;
        const getOnePasajero = await Pasajeros.findByPk(id_pasajero);
        if(!getOnePasajero){
            return res.status(404).json({message: 'Pasajero no encontrado'});
        }
        res.json(getOnePasajero);
    } catch (error){
        res.status(500).json({ error: error.message, 
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
};

module.exports = {
    getPasajeros,
    createPasajero,
    deletePasajero,
    updatePasajero,
    getOnePasajero,
};