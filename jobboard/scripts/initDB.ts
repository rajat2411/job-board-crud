// scripts/initDb.ts

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const initDatabase = () => {
    db.connect((err) => {
        if (err) throw err;
        console.log('Connected to MySQL server.');

        // Create database and table
        const createDatabase = 'CREATE DATABASE IF NOT EXISTS job_board';
        const useDatabase = 'USE job_board';
        const createTable = `
            CREATE TABLE IF NOT EXISTS jobs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                company VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL,
                salary DECIMAL(10,2) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;

        db.query(createDatabase, (err) => {
            if (err) throw err;
            console.log('Database created or already exists.');

            db.query(useDatabase, (err) => {
                if (err) throw err;

                db.query(createTable, (err) => {
                    if (err) throw err;
                    console.log('Jobs table created or already exists.');
                    db.end();
                });
            });
        });
    });
};

initDatabase();
