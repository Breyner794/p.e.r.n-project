const express = require('express');

const {
    getUsuariosById,
    getAllUsuarios,
    createUsuario,
    deleteUsuario,
} = require('../controllers/r_h.usuariosController.js');

const router = express.Router();

router.get('/usuarios/:id_usuario', getUsuariosById);
router.get('/usuarios', getAllUsuarios);
router.post('/usuarios', createUsuario);
router.delete('/usuarios/:id_usuario', deleteUsuario);

module.exports=router;