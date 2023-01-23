const mysql = require('mysql2/promise');
const config = require('../config');

const pool = mysql.createPool(config.db);

async function query(sql, params) {
    /*pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }
        if (connection) connection.release()
        return
    })*/

    const [results,] = await pool.query(sql, params);
    return results;
}

module.exports = {
    query
}
