ALTER TABLE reportes
ADD COLUMN nombre VARCHAR(100),
ADD COLUMN email VARCHAR(100),
ADD COLUMN telefono VARCHAR(20);

// 03/05/2025 09:40
CREATE TABLE alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  driver_id VARCHAR(50),
  type VARCHAR(100),
  timestamp DATETIME
);

