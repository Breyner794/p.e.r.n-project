const express = require('express');

const {getAllTripulaciones,
    getTripulacionBy,
    deleteTripulacion,
    createTripulacion,
    updateTripulacion,
}= require('../../controllers/OperacionesControllers/tripulacion_vueloControllers.js');

const router = express.Router();

router.get('/tripulacion', getAllTripulaciones);
router.get('/tripulacion/:id_tripulacion', getTripulacionBy);
router.delete('/tripulacion/:id_tripulacion', deleteTripulacion);
router.post('/tripulacion', createTripulacion);
router.put('/tripulacion/:id_tripulacion', updateTripulacion);

module.exports=router;