// config/db.js
const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

// MySQL Configuration
const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'proj2023'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + mysqlConnection.threadId);
});

// MongoDB Configuration
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/proj2023MongoDB';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB: ' + err.message));

// Export both connections
module.exports = {
    mysqlConnection,
    mongoose
};