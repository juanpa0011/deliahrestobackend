const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Lee variables de entorno del archivo .env

const DB = require('../database/conexion.js');

// swagger data requiered for testing

const {options} = require ('../helpers/swagger.js');

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const specs = swaggerJsDoc(options)

// Tutorial uses MORGAN, CORS, LOWDB, EXPRESS. Adapting to our own DB.

class Servidor {
    constructor() {
        this.app = express();
        this.puerto = process.env.EXPRESS_PORT;
        this.rutaApi = '/api';

        this.middlewares();
        this.router();
        this.conection()
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public')); // crea una ruta en la cap public p/server web ( servidor web )
        this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
    }
    router() {
        this.app.use(this.rutaApi, require('../routes/api.routes.js'));
    }
    conection() {
        DB.connect(error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Conectado a DB.')
            }
        })
    }
    listen(){
        this.app.listen(this.puerto, () => {
            console.log(`We are listening the server: Localhost:${this.puerto}` );
            console.log(`Api en: Localhost:${this.puerto}/${this.rutaApi}`);
        });
    }
}

module.exports = Servidor;