import mongoose = require('mongoose');
const { randomIntFromInterval } = require('../services/randomIntGenerator');

//sets random time interval in ms, from 2 min to 24 hours
const randomInterval = randomIntFromInterval(120000, 84000000);

const AppointmentSchema = new mongoose.Schema({
    date: {
        type: String,
        default: Date.now() + randomInterval,
    },
    user: { type: String, required: true },
    doctor: { type: String, required: true },
    active: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
