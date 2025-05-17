const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const driverRoutes = require('./routes/driverRoutes');

dotenv.config();

const app = express();
app.use(cors()); // permite conexiones
app.use(express.json());

// Rutas
app.use('/driver', driverRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT} WIIII`);
});

