const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const driverRoutes = require('./routes/driverRoutes');
const lineaRoutes = require('./routes/lineaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors()); // permite conexiones
app.use(express.json());

// Rutas
app.use('/driver', driverRoutes);
app.use('/lineas', lineaRoutes);
app.use('/api', reporteRoutes); // esto hará que las rutas estén en /api/reportes
app.use('/auth', authRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT} WIIII`);
});

