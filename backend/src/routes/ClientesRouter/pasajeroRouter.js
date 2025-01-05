const express = require('express');

const{ 

    getPasajeros,
    createPasajero,
    getOnePasajero,
    updatePasajero,
    deletePasajero,

} = require('../../controllers/ClientesControllers/pasajerosControllers.js');

const router = express.Router();

router.get('/pasajeros', getPasajeros);
router.post('/pasajeros', createPasajero);
router.get('/pasajeros/:id_pasajero', getOnePasajero);
router.put('/pasajeros/:id_pasajero', updatePasajero);
router.delete('/pasajeros/:id_pasajero', deletePasajero);

module.exports = router;
