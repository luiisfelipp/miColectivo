CREATE DATABASE micolectivo;

USE micolectivo;

CREATE TABLE hijos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  passenger_count INT DEFAULT 0
);

TRUNCATE table DRIVERS;

INSERT INTO drivers (id, name, latitude, longitude, passenger_count)
VALUES 
(1, 'Bryan', -33.59834451270723, -70.70587561421843, 2),
(2, 'María', -33.598938607959994, -70.70664013019172, 4),
(3, 'Juan', -33.59916248352399, -70.70547894276307, 1),
(4, 'Adrian', -33.597599989564955, -70.7052200233272, 4),
(5, 'Esteban', -33.59897472387835, -70.70645815996221, 4);

select * from drivers;

CREATE TABLE driver_locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  driver_id INT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(10,8),
  timestamp DATETIME
);

truncate table simulated_routes;
select * from driver_locations;


CREATE TABLE simulated_routes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  driver_id INT NOT NULL,
  step INT NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL
);

INSERT INTO simulated_routes (driver_id, step, latitude, longitude) VALUES
(1, 1, -33.59900189077079, -70.70609042968934),
(1, 2, -33.59880188794338, -70.70602532015198),
(1, 3, -33.5987399049424, -70.70599858623788),
(1, 4, -33.598362724465275, -70.70587189142205),
(1, 5, -33.5979117887542, -70.70571792128463),
(1, 6, -33.59768218296906, -70.70562355249581);

-- Ruta para Freire (driver_id = 2)
INSERT INTO simulated_routes (driver_id, step, latitude, longitude) VALUES
(2, 1, -33.59891293895411, -70.70670552174185),
(2, 2, -33.59892904351606, -70.70653924252271),
(2, 3, -33.59900634537099, -70.70622988584651),
(2, 4, -33.59905787990244, -70.70599786833935),
(2, 5, -33.59913518164282, -70.70566144291715),
(2, 6, -33.59928012221752, -70.70495378952033);

-- Ruta para Av. San José (driver_id = 3)
INSERT INTO simulated_routes (driver_id, step, latitude, longitude) VALUES
(3, 1, -33.59782995995287, -70.70412040869252),
(3, 2, -33.5977654298714, -70.70444269398324),
(3, 3, -33.59768025008994, -70.70475568258288),
(3, 4, -33.59762346352222, -70.70501598993309),
(3, 5, -33.59755118965469, -70.70527629728328),
(3, 6, -33.597486659360406, -70.70555209914666);

delete from simulated_routes where step="6";

select * from simulated_routes;

CREATE TABLE drivers_steps (
  driver_id INT PRIMARY KEY,
  step INT NOT NULL
);

