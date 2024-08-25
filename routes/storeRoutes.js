const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.get('/stores', storeController.getStores);
router.get('/stores/edit/:sid', storeController.getEditStore);
router.post('/stores/edit/:sid', storeController.updateStore);

module.exports = router;