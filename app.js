const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose'); // Import mongoose

// Initialize Express app
const app = express();

// Set up EJS as the templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up body-parser middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB configuration
mongoose.connect('mongodb://localhost:27017/proj2023MongoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Import routes
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');
const managerRoutes = require('./routes/managerRoutes'); // Add MongoDB routes

// Use the routes
app.use(storeRoutes);
app.use(productRoutes);
app.use(managerRoutes); // Use MongoDB routes

// Define a home route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        links: [
            { url: '/stores', text: 'Stores Page' },
            { url: '/products', text: 'Products Page' },
            { url: '/managers', text: 'Managers Page (MongoDB)' } // Link to MongoDB page
        ]
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});