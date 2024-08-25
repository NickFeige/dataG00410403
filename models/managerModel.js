const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Manager ID
    name: { type: String, required: true },
    salary: { type: Number, required: true }
});

module.exports = mongoose.model('Manager', managerSchema);