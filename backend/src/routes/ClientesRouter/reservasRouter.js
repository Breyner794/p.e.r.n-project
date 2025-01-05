const express = require('express');

const {

    getReserva,
    getReservaOne,
    createReserva,
    updateReserva,
    deleteReserva,

} = require('../../controllers/ClientesControllers/reservasControllers.js');

const router = express.Router();

router.get('/reservas', getReserva);
router.get('/reservas/:id_reserva', getReservaOne);
router.post('/reservas', createReserva);
router.put('/reservas/:id_reserva', updateReserva);
router.delete('/reservas/:id_reserva', deleteReserva);

module.exports = router;