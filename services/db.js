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
