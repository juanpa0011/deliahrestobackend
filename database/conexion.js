const mysql = require('mysql');
const squelize = require('sequelize');
const path = 'mysql://root@localhost:3000'; // As long as it is LOCALHOST:3000, it will search there

const DB = mysql.createConnection({
    host: 'localhost', // process.env.HOST,
    user: 'root', // Myself.
    password: '', // Levantar informacion sencible de Variables de Entorno (.ENV)
    database: 'delilah_restov1' // Nombre de la base de Datos
});

module.exports = DB;

/*


*/