const mysql = require("mysql2");

const Connection = mysql.createConnection({
    // Completar con los datos de la conexión

    host: "localhost",
    user: "root",
    password: "",
    database: "spoticfy",
});

module.exports = Connection;
