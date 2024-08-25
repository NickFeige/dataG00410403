const Manager = require('../models/managerModel');

// Controller to get all managers and render the page
exports.getAllManagers = async (req, res) => {
    try {
        // Fetch all managers from the MongoDB collection
        const managers = await Manager.find(); // Returns a promise, no callback
        // Render the 'listManagers' view and pass the managers data
        res.render('listManagers', { managers });
    } catch (err) {
        // If there's an error, respond with a status of 500 and the error message
        res.status(500).send(err);
    }
};

// Controller to create a new manager and handle form submission
exports.createManager = async (req, res) => {
    const { _id, name, salary } = req.body; // Extract form data from the request body
    let errors = []; // Initialize an array to store validation errors

    // Validation rules
    if (_id.length !== 4) {
        errors.push("Manager ID must be 4 characters in length.");
    }

    if (name.length <= 5) {
        errors.push("Name must be greater than 5 characters.");
    }

    if (salary < 30000 || salary > 70000) {
        errors.push("Salary must be between 30,000 and 70,000.");
    }

    try {
        // Check if the manager ID already exists in the database
        const existingManager = await Manager.findById(_id); // Returns a promise, no callback

        if (existingManager) {
            errors.push("Manager ID already exists.");
        }

        // If there are validation errors, render the 'addManager' view with the errors
        if (errors.length > 0) {
            return res.render('addManager', { errors });
        } else {
            // If no errors, create a new manager instance and save it to the database
            const newManager = new Manager({ _id, name, salary });
            await newManager.save(); // Save the manager, returns a promise, no callback
            // After saving, redirect to the managers list page
            res.redirect('/managers');
        }
    } catch (err) {
        // If there's an error during the process, respond with a status of 500 and the error message
        res.status(500).send(err);
    }
};