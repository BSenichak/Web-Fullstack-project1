const mysql = require("mysql2");
let dbname = "roboolx";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
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
