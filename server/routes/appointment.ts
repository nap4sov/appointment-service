const express = require('express');
const router = express.Router();
const { getAppointments, deleteAppointment } = require('../controllers/appointmentController');

router.get('/', getAppointments);

router.delete('/:appointmentId', deleteAppointment);

module.exports = router;
