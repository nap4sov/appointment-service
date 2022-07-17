const User = require('../models/User');

// API endpoint: /users
// method: GET
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.send(error.message);
    }
};

// API endpoint: /users/userId
// method: DELETE
const deleteUser = async (req, res) => {
    try {
        const userToRemove = await User.deleteOne({ _id: req.params.userId });
        res.json(userToRemove);
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getAllUsers, deleteUser };
