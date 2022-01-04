// file to connect to mysql automatically via my credentials

const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Databaseguru#101!',
        database: 'employee_tracker'
    },
    console.log("connected to the employee_tracker database")
);

module.exports = db;