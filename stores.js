const express = require('express');
const router = express.Router();

// Define a route for the "Stores" section
router.get('/', (req, res) => {
    res.send('This is the Stores page');
});

// You can add more routes here, for example:
router.get('/details', (req, res) => {
    res.send('Details of Stores');
});

// Export the router to use in your main app
module.exports = router;