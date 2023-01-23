function connection() {
    try {
        const mysql = require('mysql2');
        const config = require('../config');

        const pool = mysql.createPool(config.db);
        const promisePool = pool.promise();

        return promisePool;
    } catch (error) {
        return console.log(`Could not connect - ${error}`);
    }
}

const pool = connection();

module.exports = {
    connection: async () => pool.getConnection(),
    execute: (...params) => pool.execute(...params)
};

/*
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
*/
