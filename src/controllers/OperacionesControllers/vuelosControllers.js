const Vuelos = require('../../models/OperacionesModels/vuelos.js');
const Aeropuertos = require('../../models/OperacionesModels/aeropuertos.js');
const Aviones = require('../../models/OperacionesModels/aviones.js');

const getAllVuelos = async (req, res) => {
    try {
        const getVuelo = await Vuelos.findAll({
            include:[
                {
                    model: Aeropuertos,
                    as: 'aeropuertoOrigen'
            },{
                model: Aeropuertos,
                as: 'aeropuertoDestino'
            }
        ]
        });
        res.json(getVuelo);
    } catch (error) {
        res.status(500).json({ error: error.message, 
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
};

const getVuelos = async (req, res) => {
    try {
        const{id_vuelo} = req.params;
        const getVuelosbyId = await Vuelos.findByPk(id_vuelo,{
            include:[
                {
                    model: Aeropuertos,
                    as: 'aeropuertoOrigen'
            },{
                model: Aeropuertos,
                as: 'aeropuertoDestino'
            }
        ]
        });
        if(!getVuelosbyId){
            return res.status(404).json({message: 'Vuelo no encontrado'});
        }

        res.json(getVuelosbyId);
    } catch (error) {
        res.status(500).json({ error: error.message, 
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
};

const deleteVuelo = async (req, res) => {
    try {
      const { id_vuelo } = req.params;
      const deletevuelo = await Vuelos.findByPk(id_vuelo);
      if (deletevuelo) {
        await deletevuelo.destroy();
        res.json({ message: 'Vuelo eliminado exitosamente' });
      } else {
        res.status(404).json({ error: 'Vuelo no Encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
  };

  const updateVuelo = async (req, res) => {
    try {
      const { id_vuelo } = req.params;
      const { numero_de_vuelo, origen, destino, 
        fecha_hora_salida, fecha_hora_llegada, estado_vuelo, id_avion} = req.body;
      const vuelo = await Vuelos.findByPk(id_vuelo);
      if (vuelo) {
        vuelo.nombre_de_vuelo = numero_de_vuelo;
        vuelo.origen = origen;
        vuelo.destino = destino;
        vuelo.fecha_hora_salida =  fecha_hora_salida;
        vuelo.fecha_hora_llegada = fecha_hora_llegada;
        vuelo.estado_vuelo = estado_vuelo,
        vuelo.id_avion = id_avion
        await vuelo.save();
        res.json(vuelo);
      } else {
        res.status(404).json({ error: 'Vuelo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const createVuelo = async (req, res) =>{

    try{
        const { numero_de_vuelo, origen, destino, 
            fecha_hora_salida, fecha_hora_llegada, estado_vuelo, id_avion} = req.body;

        const numero_vuelo_existente = await Vuelos.findOne({
            where:{numero_de_vuelo}
        });

        //validacion de destino y origen
        if (origen === destino) {
            return res.status(400).json({
              success: false,
              mensaje: 'El origen y destino no pueden ser el mismo aeropuerto'
            });
          }

        // Verificar que ambos aeropuertos existen
        const [origenExiste, destinoExiste] = await Promise.all([
        Aeropuertos.findByPk(origen),
        Aeropuertos.findByPk(destino)
            ]);
  
        if (!origenExiste || !destinoExiste) {
            return res.status(404).json({
            success: false,
            mensaje: 'Uno o ambos aeropuertos no existen'
            });
        }

        //validacion de numero de vuelo repetido
        if(numero_vuelo_existente){
            return res.status(400).json({
                success: false,
                message: 'Numero de vuelo ya se encuentra registrado.'
            });
        }

        //crear un nuevo vuelo
        const newVuelo = await Vuelos.create({

            numero_de_vuelo, 
            origen, 
            destino, 
            fecha_hora_salida,
            fecha_hora_llegada,
            estado_vuelo,
            id_avion

        });
        //carga los datos con sus id
        const vuelosRelaciones = await Vuelos.findByPk(newVuelo.id_vuelo,{
            include:[
                {model: Aeropuertos, as: 'aeropuertoOrigen'},
                {model: Aeropuertos, as: 'aeropuertoDestino'},
                {model: Aviones, as: 'avion'}
            ]
        });
        res.status(201).json(vuelosRelaciones);
    }catch(error){
        return res.status(500).json({
            success: false,
            mensaje: 'Error al crear el vuelo',
            error: error.message
          });
    }


};

module.exports={
    getAllVuelos,
    getVuelos,
    deleteVuelo,
    createVuelo,
    updateVuelo,
};