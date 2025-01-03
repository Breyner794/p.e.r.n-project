const express = require('express');
const sequelize = require('./db.js');
const empleadosRouters = require('./routes/empleadosRoutes.js'); // ../src/routes/empleadosRoutes.js
const rolesRouters = require('./routes/r_h.rolesRoutes.js');
const UsuariosRouters = require('./routes/r_h.usuariosRouters.js');;
const AeropuertosRouters = require('./routes/OperacionesRouter/aeropuertosRouter.js');
const AvionesRouters = require('./routes/OperacionesRouter/AvionesRouter.js');
const VuelosRouters = require('./routes/OperacionesRouter/vuelosRouters.js');
const TripulacionRouter = require('./routes/OperacionesRouter/tripulacionRouter.js')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/', empleadosRouters, rolesRouters, UsuariosRouters, AeropuertosRouters, AvionesRouters, VuelosRouters, TripulacionRouter);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});