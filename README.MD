# Deliah Resto
<br>

### Back-End Server working node.js / MariaDB / request.rest
<br>

Libraries added - <br>
    "bcrypt": "^5.0.1", <br>
    "cors": "^2.8.5", <br>
    "dotenv": "^10.0.0", <br>
    "express": "^4.17.1", <br>
    "helmet": "^4.6.0", ( Not used ) <br>
    "jsonwebtoken": "^8.5.1", <br>
    "mysql": "^2.18.1",  <br>
    "sequelize": "^6.6.5", ( Not used ) <br>
    "swagger-jsdoc": "^6.1.0", ( API UI requiered ) <br>
    "swagger-ui-express": "^4.1.6" ( API UI requiered ) <br>


### Orientacion de instalacion - <br>

1. Descargar los archivos del repositorio GitHub

    1-A. Tener nodemon descargado de manera global es sugerido. Usar node es opcional. 

2. Abrir la consola de comandos ( CMD ) y dirigir el enfoque de la consola sobre la carpeta donde fueron descargados los archivos.

3. Crear el packages json. (npm init) para empezar la descargas de las librerias.

4. Luego empezar la descarga de las librerias necesarias. <br>
    4-A. Las librerias necesarias son: <br>
        npm i cors -save <br>
        npm i bcrypt -save <br>
        npm i dotenv -save <br>
        npm i express -save <br>
        npm i jsonwebtoken -save <br>
        npm i mysql -save <br>
        npm i swagger-jsdoc -save <br>
        npm i swagger-ui-express -save <br>

5. Una vez terminada la instalacion de todas las librerias es momento de crear la base de datos. Crear una base de datos con el nombre "delilah_restov1" <br>
    database utf8mb4_unicode_ci <br>
    Servidor: MariaDB <br>
    Usuario: root@localhost <br>
    Conjunto de caracteres del servidor: UTF-8 Unicode (utf8mb4) <br>
    Apache/2.4.48 (Win64) OpenSSL/1.1.1k PHP/8.0.8 <br>

    5-A. CREATE TABLE `usuarios` (id_user int(22) AUTO_INCREMENT PRIMARY KEY, `username` varchar(120) NOT NULL, `nomape` varchar(120) NOT NULL, `email` varchar(120) NOT NULL, `tel` varchar(120) NOT NULL, `password` varchar(120) NOT NULL, `dir` varchar(120) NOT NULL, `role` enum('USER','ADM') DEFAULT 'USER');

    5-B. CREATE TABLE `productos` (`id_pro` int(22) AUTO_INCREMENT PRIMARY KEY, `nombre` varchar(120) NOT NULL, `precio` int(22) NOT NULL, `detalle` varchar(220) DEFAULT NULL, `url` varchar(220) DEFAULT NULL);

    5-C. CREATE TABLE `pedidos` (id_ped int(22) AUTO_INCREMENT PRIMARY KEY, `id_user_ped` int(22) NOT NULL, `hora` time DEFAULT CURRENT_TIMESTAMP, `estado` enum('NUEVO','PREPARANDO','ENVIANDO','CANCELADO','ENTREGADO') DEFAULT 'NUEVO', `pagoTipo` enum('EFE','TAR') NOT NULL);

    5-D. CREATE TABLE `lista` (id_lista int(22) AUTO_INCREMENT PRIMARY KEY, `id_ped_lista` int(22) NOT NULL, `id_producto_lista` int(22) NOT NULL, `cant` int(22) NOT NULL DEFAULT 1)

    5-E. ALTER TABLE `pedidos` ADD CONSTRAINT `pedido-user-relacion` FOREIGN KEY (`id_user_ped`) REFERENCES `usuarios`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

    5-F. ALTER TABLE `lista` ADD CONSTRAINT `lista-pedidos` FOREIGN KEY (`id_ped_lista`) REFERENCES `pedidos`(`id_ped`) ON DELETE CASCADE ON UPDATE CASCADE;

    5-G. ALTER TABLE `lista` ADD CONSTRAINT `lista-productos` FOREIGN KEY (`id_producto_lista`) REFERENCES `productos`(`id_pro`) ON DELETE CASCADE ON UPDATE CASCADE;

    5-H. INSERT INTO `productos` (`nombre`, `precio`, `detalle`, `url`) VALUES ("Plato De Prueba 1", 875, "Un detalle de la prueba 1", "URL.img"), ("Plato De Prueba 2", 1275, "Un detalle de la prueba 2", "URL.img"); 

    5-I. INSERT INTO `usuarios` (`username`, `nomape`, `email`, `tel`, `password`, `dir`, `role`) VALUES ("Admin", "Administrador", "administrador@hotmail.com", "1166789824", "$2b$10$tFbbChiPlPhnXLDEP0QeJe5sEjZYXcrY1sZ2MDWA8hXihSyYJ958O", "No man's land", "ADM"), ("User", "Usuario", "Usuario@hotmail.com", "1166229824", "$2b$10$tFbbChiPlPhnXLDEP0QeJe5sEjZYXcrY1sZ2MDWA8hXihSyYJ958O", "No man's land", "USER"); 

6. Con la base de datos levantada y algunos datos de prueba podemos comenzar a crear pedidos por medio de los end-points. Como estos necesitan de un paso a paso por la conexion de FKs, recomendaria probarlo con "Request.rest" o Postman.

7. Para ver la documentacion Swagger, abra un navegador y busque http://localhost:3000/api-docs/ - Para ver el archivo en cuestion, puede revisarlo en la carpeta helpers/swagger.js