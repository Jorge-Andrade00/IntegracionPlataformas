const { database } = require('./Keys');
const {promisify} = require('util');
const mysql = require('mysql');
const pool = mysql.createPool(database);

pool.getConnection((err, con) =>{
    if (err) {
        console.log('Error al conectar');
    }
    if (con) {
        con.release();
        console.log('conectado');
    }
});

pool.query = promisify(pool.query);


module.exports = pool;