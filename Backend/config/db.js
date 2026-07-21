require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const initDb = () => {
    const createRoleTable = `
        CREATE TABLE IF NOT EXISTS role (
            id INT AUTO_INCREMENT PRIMARY KEY,
            role_name VARCHAR(50) UNIQUE NOT NULL
        )
    `;

    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            role VARCHAR(50) NOT NULL
        )
    `;

    const seedRoles = `
        INSERT IGNORE INTO role (role_name) 
        VALUES ('superadmin'), ('admin'), ('teacher'), ('student'), ('principal')
    `;

    db.query(createRoleTable, (err) => {
        if (err) {
            console.error("Error creating role table:", err);
            return;
        }
        db.query(seedRoles, (err) => {
            if (err) console.error("Error seeding roles:", err);
        });
    });

    db.query(createUsersTable, (err) => {
        if (err) {
            console.error("Error creating users table:", err);
        } else {
            console.log("Database tables checked/created successfully");
        }
    });
};

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database Connection Failed:", err.message);
    } else {
        console.log("Database Connected Successfully (Pool)");
        connection.release();
        initDb();
    }
});

module.exports = db;