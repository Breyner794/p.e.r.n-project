const express = require('express');

const{  
    getEquipaje,
    createEquipaje,
    updateEquipaje,
    deleteEquipaje,
} = require('../../controllers/ClientesControllers/equipajeControllers.js');

const router = express.Router();

router.get('/equipaje', getEquipaje);
router.post('/equipaje', createEquipaje);
router.put('/equipaje/:id_equipaje', updateEquipaje);
router.delete('/equipaje/:id_equipaje', deleteEquipaje);

module.exports = router;