import express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/userController');
const { createAppointment } = require('../controllers/appointmentController');

router.get('/', getAllUsers);

router.patch('/:userId', createAppointment);

router.delete('/:userId', deleteUser);

module.exports = router;
