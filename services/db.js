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

/*console.log("Create database pool");
const pool = mysql.createPool(config.db);

function query(sql, params) {
    pool.getConnection((err, connection) => {
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
    })

    const [results,] = await pool.query(sql, params);
    return results;

    console.log("Query database");
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
          if (err) {
            return reject(err);
          }
          console.log("Got connection, QUERY: " + sql);
          connection.query(sql, args, function(err, result) {
            connection.release();
            if (err) {
              return reject(err);
            }
            console.log("Result: " + result);
            return resolve(result);
          });
        });
      });
}

module.exports = {
    query
}*/
