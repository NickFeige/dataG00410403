const Manager = require('../models/managerModel');

class ManagerDAO {
  // Fetch all managers
  async getAllManagers() {
    try {
      return await Manager.find();
    } catch (error) {
      throw new Error('Error fetching managers: ' + error.message);
    }
  }

  // Add a new manager
  async addManager(managerData) {
    try {
      const newManager = new Manager(managerData);
      await newManager.save();
      return newManager;
    } catch (error) {
      throw new Error('Error adding manager: ' + error.message);
    }
  }
}

module.exports = new ManagerDAO();