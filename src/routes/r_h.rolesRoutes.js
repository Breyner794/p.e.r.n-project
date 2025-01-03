const express = require('express');

const {
    getAllRoles,
    createRoles,
    updateRoles,
    deleteRoles,
} = require('../controllers/r_h.rolesController.js');

const router = express.Router();

router.get('/rol', getAllRoles);
router.post('/rol', createRoles);
router.put('/rol/:id_rol', updateRoles);
router.delete('/rol/:id_rol', deleteRoles);

module.exports = router;