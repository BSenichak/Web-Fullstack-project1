const mysql = require("mysql2");
require('dotenv').config();
let host = process.env.HOST_URL;
let port = process.env.PORT;
let user = process.env.DB_USER ;
let password = process.env.PASSWORD ;
let dbname = process.env.DATABASE_NAME;

const connection = mysql.createConnection({
    host ,
    user,
    password,
    port
});
connection.connect(async (err) => {
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    connection.query(
        "CREATE DATABASE IF NOT EXISTS " + dbname,
        (err, result) => {
            if (err) return;
            connection.changeUser({ database: dbname }, (err) => {
                if (err) return;
                const createProductsTable = `
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    image TEXT
                )`;
                connection.query(createProductsTable, (err, result) => {
                    if (err) return;
                });
            });
        }
    );
});

module.exports = connection;
