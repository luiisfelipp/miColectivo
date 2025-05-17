// Simulación de movimiento de choferes basado en rutas
const db = require('./db');

function simulateDriverMovementFromRoutes() {
  const getDriversSQL = 'SELECT id FROM drivers';

  db.query(getDriversSQL, (err, drivers) => {
    if (err) {
      console.error('Error al obtener choferes:', err);
      return;
    }

    drivers.forEach(driver => {
      const driverId = driver.id;

      // Obtener el paso actual o iniciar en 1
      const getLastStepSQL = `
        SELECT step FROM drivers_steps WHERE driver_id = ?
      `;
      db.query(getLastStepSQL, [driverId], (err, stepResults) => {
        let currentStep = 1;
        if (stepResults.length > 0) {
          currentStep = stepResults[0].step + 1;
        }

        const getRouteSQL = `
          SELECT latitude, longitude FROM simulated_routes
          WHERE driver_id = ? AND step = ?
        `;
        db.query(getRouteSQL, [driverId, currentStep], (err, routeResults) => {
          if (routeResults.length === 0) {
            // Reiniciar al paso 1 si ya no hay más pasos
            currentStep = 1;
            db.query(getRouteSQL, [driverId, currentStep], (err, resetResults) => {
              if (resetResults.length > 0) {
                const { latitude, longitude } = resetResults[0];
                updateDriverLocation(driverId, latitude, longitude, currentStep);
              }
            });
          } else {
            const { latitude, longitude } = routeResults[0];
            updateDriverLocation(driverId, latitude, longitude, currentStep);
          }
        });
      });
    });
  });
}

function updateDriverLocation(driverId, latitude, longitude, step) {
  const updateSQL = `
    UPDATE drivers SET latitude = ?, longitude = ? WHERE id = ?
  `;
  db.query(updateSQL, [latitude, longitude, driverId], err => {
    if (err) return console.error(`Error actualizando ubicación del chofer ${driverId}:`, err);

    const updateStepSQL = `
      INSERT INTO drivers_steps (driver_id, step)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE step = ?
    `;
    db.query(updateStepSQL, [driverId, step, step]);
  });
}

// Ejecutar cada 3 segundos
setInterval(simulateDriverMovementFromRoutes, 2500);




