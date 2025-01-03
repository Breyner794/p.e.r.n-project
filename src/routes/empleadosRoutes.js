const express = require('express');

const {
    getAllEmpleados,
    createEmpleado,
    getEmpleadoById,
    updateEmpleado,
    deleteEmpleado,
} = require('../controllers/empleadosController.js');

const router = express.Router();

/* Configurar el nombre de la ruta, para la api, osea que si le cambio el nombre a empleadoss entonces la direccion seria http://localhost:5000/api/empleadoss*/

router.get('/empleados', getAllEmpleados);
router.post('/empleados', createEmpleado);
router.get('/empleados/:id_empleado', getEmpleadoById);
router.put('/empleados/:id_empleado', updateEmpleado);
router.delete('/empleados/:id_empleado', deleteEmpleado);

module.exports = router;