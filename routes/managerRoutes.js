const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController'); // Ensure this path is correct

// Route to list all managers
router.get('/managers', managerController.getAllManagers);

// Route to display the add manager form
router.get('/managers/add', (req, res) => {
    res.render('addManager', { errors: [] });
});

// Route to handle form submission for adding a manager
router.post('/managers/add', managerController.createManager); // Ensure createManager is properly defined

module.exports = router;