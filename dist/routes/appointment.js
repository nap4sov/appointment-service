var express = require('express');
var router = express.Router();
var _a = require('../controllers/appointmentController'), getAppointments = _a.getAppointments, deleteAppointment = _a.deleteAppointment;
router.get('/', getAppointments);
router.delete('/:appointmentId', deleteAppointment);
module.exports = router;
