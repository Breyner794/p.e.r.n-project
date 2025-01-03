const express = require('express');

const{
    getAllAeropuertos,
    createAeropuerto,
    deleteaeropuerto,
    updateAeropuerto,
} = require ('../../controllers/OperacionesControllers/aeropuertosControllers.js')

const router = express.Router();

router.get('/aeropuertos', getAllAeropuertos);
router.post('/aeropuertos', createAeropuerto);
router.delete('/aeropuertos/:id_aeropuerto', deleteaeropuerto);
router.put('/aeropuertos/:id_aeropuerto', updateAeropuerto);

module.exports=router;