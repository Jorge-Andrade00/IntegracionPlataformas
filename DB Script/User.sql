CREATE TABLE usuario (
    id INT(11) NOT NULL,
    email VARCHAR(50) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    pass VARCHAR(255) NOT NULL
);

ALTER TABLE usuario
    ADD PRIMARY KEY (id);

ALTER TABLE usuario
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE producto(
    id INT(11) NOT NULL,
    nombre VARCHAR(25) NOT NULL,
    imgdir VARCHAR(255) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    stock INT NOT NULL
);
ALTER TABLE producto
    ADD PRIMARY KEY (id);

ALTER TABLE producto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;