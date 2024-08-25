const productModel = require('../models/productModel');

// Display all products
exports.getProducts = (req, res) => {
    productModel.getAllProducts((products) => {
        res.render('products', { products });
    });
};

// Handle product deletion
exports.deleteProduct = (req, res) => {
    const pid = req.params.pid;
    productModel.checkProductInStores(pid, (inStores) => {
        if (inStores) {
            res.send('Product is currently in stores and cannot be deleted.');
        } else {
            productModel.deleteProductById(pid, () => {
                res.redirect('/products');
            });
        }
    });
};