import express = require('express');
const router = express.Router();
const { getAllDoctors, deleteDoctor } = require('../controllers/doctorController');
const { updateAppointment } = require('../controllers/appointmentController');

router.get('/', getAllDoctors);

router.patch('/:doctorId', updateAppointment);

router.delete('/:doctorId', deleteDoctor);

module.exports = router;
