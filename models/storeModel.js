// models/storeModel.js
const db = require('../config/db').mysqlConnection;

// Get all stores
exports.getAllStores = (callback) => {
    const sql = `
        SELECT s.sid, s.location 
        FROM store s
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        callback(results);
    });
};

// Get store by ID
exports.getStoreById = (sid, callback) => {
    const sql = 'SELECT * FROM store WHERE sid = ?';
    db.query(sql, [sid], (err, results) => {
        if (err) throw err;
        callback(results[0]);
    });
};

// Add a new store
exports.addStore = (location, callback) => {
    const sql = 'INSERT INTO store (location) VALUES (?)';
    db.query(sql, [location], (err, results) => {
        if (err) throw err;
        callback(results.insertId);
    });
};

// Delete a store by ID
exports.deleteStoreById = (sid, callback) => {
    const sql = 'DELETE FROM store WHERE sid = ?';
    db.query(sql, [sid], (err, results) => {
        if (err) throw err;
        callback(results);
    });
};

// Update store location by ID
exports.updateStoreById = (sid, location, callback) => {
    const sql = 'UPDATE store SET location = ? WHERE sid = ?';
    db.query(sql, [location, sid], (err, results) => {
        if (err) throw err;
        callback(results);
    });
};