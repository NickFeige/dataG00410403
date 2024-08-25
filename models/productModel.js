const { mysqlConnection } = require('../config/db');

// Get all products with store details
exports.getAllProducts = (callback) => {
    const sql = `
        SELECT p.pid, p.productdesc, s.sid, s.location, ps.price 
        FROM product p
        JOIN product_store ps ON p.pid = ps.pid
        JOIN store s ON ps.sid = s.sid
    `;
    mysqlConnection.query(sql, (err, results) => {
        if (err) throw err;
        callback(results);
    });
};

// Delete a product by ID
exports.deleteProductById = (pid, callback) => {
    const sql = 'DELETE FROM product WHERE pid = ?';
    mysqlConnection.query(sql, [pid], (err, results) => {
        if (err) throw err;
        callback(results);
    });
};

// Check if a product is associated with any stores
exports.checkProductInStores = (pid, callback) => {
    const sql = 'SELECT COUNT(*) AS count FROM product_store WHERE pid = ?';
    mysqlConnection.query(sql, [pid], (err, results) => {
        if (err) throw err;
        callback(results[0].count > 0);
    });
};