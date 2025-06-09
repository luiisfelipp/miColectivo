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

09-06-2025 10:25
dependencias necesarias para login:
//npm install bcrypt
//npm install jsonwebtoken


CREATE TABLE auth_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  numero_telefono VARCHAR(20),
  password VARCHAR(100) NOT NULL,
  role ENUM('usuario', 'chofer', 'central') NOT NULL DEFAULT 'usuario',
  reference_id INT, -- puede apuntar a driver_id, user_id u otro
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chofer contraseña: 'chofer' (hasheada)
INSERT INTO auth_users (username, email, numero_telefono, password, role)
VALUES ('jose', 'chofer@gmail.com', '+56985632565', '$2b$10$X0VM4T6Fr/2uqIj/vPnrVOlWJrHpBz2VXJatTSv4r9HGMM/w3licS', 'chofer');