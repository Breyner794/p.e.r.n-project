const express = require('express');

const{
    getAllAviones,
    createAvion,
    deleteAvion,
    updateAvion,
} = require ('../../controllers/OperacionesControllers/avionesController.js')

const router = express.Router();

router.get('/aviones', getAllAviones);
router.post('/aviones', createAvion);
router.delete('/aviones/:id_avion', deleteAvion);
router.put('/aviones/:id_avion', updateAvion);

module.exports=router;