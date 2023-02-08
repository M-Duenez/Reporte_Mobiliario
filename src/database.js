const mysql = require ('mysql');
const {promisify} = require('util');
const {database} =require('./keys');

const db = mysql.createPool(database);

db.getConnection((error, connection) => {
    if (error) {
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS MANY CONNECTIONS');
        }
        if(error.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection){ 
        connection.release();
        console.log('DATABASE IS CONNECTED')
        return;
    }

});

db.query = promisify(db.query);

module.exports = db;