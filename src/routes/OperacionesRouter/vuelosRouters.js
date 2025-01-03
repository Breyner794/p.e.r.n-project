const express = require('express');

const {
    
    getAllVuelos,
    getVuelos,
    deleteVuelo,
    createVuelo,
    updateVuelo,
    
} = require('../../controllers/OperacionesControllers/vuelosControllers.js');

const router = express.Router();


router.get('/vuelos', getAllVuelos);
router.get('/vuelos/:id_vuelo', getVuelos);
router.delete('/vuelos/:id_vuelo', deleteVuelo);
router.post('/vuelos', createVuelo);
router.put('/vuelos/:id_vuelo', updateVuelo);

module.exports=router;