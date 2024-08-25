const storeModel = require('../models/storeModel');

// Display all stores
exports.getStores = (req, res) => {
    storeModel.getAllStores((stores) => {
        res.render('stores', { stores });
    });
};

// Display edit store form
exports.getEditStore = (req, res) => {
    const sid = req.params.sid;
    storeModel.getStoreById(sid, (store) => {
        res.render('editStore', { store });
    });
};

// Handle store update
exports.updateStore = (req, res) => {
    const sid = req.params.sid;
    const { location, mgrid } = req.body;
    storeModel.updateStore(sid, location, mgrid, () => {
        res.redirect('/stores');
    });
};