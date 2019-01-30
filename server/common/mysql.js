const mysql = require('mysql');
const dbConf = require('../config/dbConfig');

let pool = '';
let init = async () => {
    await new Promise((resolve) => {
        pool = mysql.createPool({
            connectionLimit: 30,
            host: dbConf.host,
            user: dbConf.user,
            password: dbConf.password,
            database: dbConf.database,
            charset: 'UTF8MB4_GENERAL_CI',
        });

        pool.on('connection', () => {
            console.log('mysql connection');
        });
        pool.on('enqueue', () => console.log(`Mysql waiting for available connection slot`));
        pool.on('error', (err) => console.error(`Mysql err`));

        resolve();
    });
};

// bind mysql connection query
let bindQuery = (sql, params, db) => new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
        if (err) {
            reject(err);

            return;
        }

        conn.query(sql, params, (err, rows) => {
            conn.release();

            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

// promisify mysql connection query
let promisifyQuery = (sql, db) => new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
        if (err) {
            reject(err);

            return;
        }

        conn.query(sql, (err, rows) => {
            conn.release();

            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

module.exports = {
    init,
    bindSql(sql, params, db) {
        return bindQuery(sql, params, db);
    },
    runSql(sql, db) {
        return promisifyQuery(sql, db);
    },
};