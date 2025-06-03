const db = require('../db');

exports.updatePassengerCount = (req, res) => {
  const { driverId, count } = req.body;

  if (typeof count !== 'number' || count < 0) {
    return res.status(400).json({ error: 'Número inválido de pasajeros' });
  }

  const sql = 'UPDATE drivers SET passenger_count = ? WHERE id = ?';
  db.query(sql, [count, driverId], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar' });
    res.json({ success: true, count });
  });
};

exports.getPassengerCount = (req, res) => {
  const { driverId } = req.params;

  const sql = 'SELECT passenger_count FROM drivers WHERE id = ?';
  db.query(sql, [driverId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener pasajeros' });
    if (results.length === 0) return res.status(404).json({ error: 'Chófer no encontrado' });

    res.json({ count: results[0].passenger_count });
  });
};

// endpoint para obtener la ubicación en tiempo real de los colectivos:
exports.updateLocation = (req, res) => {
  const { driverId, latitude, longitude } = req.body;

  // Validar que vengan todos los datos
  if (!driverId || latitude == null || longitude == null) {
    return res.status(400).json({ error: 'Faltan datos para actualizar la ubicación' });
  }

  const sql = 'UPDATE drivers SET latitude = ?, longitude = ? WHERE id = ?';
  db.query(sql, [latitude, longitude, driverId], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar ubicación' });
    res.json({ success: true });
  });
};

  
exports.getAllDrivers = (req, res) => {
  const sql = 'SELECT id, name, latitude, longitude, passenger_count, linea_id FROM drivers';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener ubicaciones' });

    // Convertir latitudes y longitudes a números (en caso de que sean strings)
    const drivers = results.map(driver => ({
      ...driver,
      latitude: parseFloat(driver.latitude),  // Aseguramos que sea número
      longitude: parseFloat(driver.longitude), // Aseguramos que sea número
    }));

    res.json(drivers);
  });
};

// Visibilidad por vehículo (en memoria)
let visibilidadPorVehiculo = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
};

exports.getVisibilidadPorVehiculo = (req, res) => {
  const respuesta = Object.entries(visibilidadPorVehiculo).map(([id, visible]) => ({
    id: parseInt(id),
    name: `Vehículo ${id}`, // puedes personalizarlo si tienes los nombres
    visible
  }));
  res.json(respuesta);
};

exports.setVisibilidadPorVehiculo = (req, res) => {
  const { driverId, visible } = req.body;
  if (typeof driverId !== 'number' || typeof visible !== 'boolean') {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }

  visibilidadPorVehiculo[driverId] = visible;
  res.json({ ok: true, driverId, visible });
};




// Endpoint para obtener visibilidad y línea de los vehículos (colectivos)
exports.getDriversConLinea = (req, res) => {
  const sql = 'SELECT id, name, linea_id FROM drivers';

  // Ejecutamos la consulta
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar drivers con línea:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    res.json(results);
  });
};

// ALERTAS DEL DRIVER
exports.sendEmergencyAlert = (req, res) => {
  const { driverId, type, timestamp } = req.body;

  if (!driverId || !type || !timestamp) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  // Convertir timestamp ISO a formato MySQL
  // Si timestamp viene como "2025-06-03T13:45:56.700Z"
  const mysqlTimestamp = timestamp.slice(0, 19).replace('T', ' ');

  const sql = 'INSERT INTO alerts (driver_id, type, timestamp) VALUES (?, ?, ?)';

  db.query(sql, [driverId, type, mysqlTimestamp], (err, result) => {
    if (err) {
      console.error('Error al guardar alerta:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json({ success: true, alertId: result.insertId });
  });
};
