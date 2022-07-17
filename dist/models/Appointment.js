"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var randomIntFromInterval = require('../services/randomIntGenerator').randomIntFromInterval;
//sets random time interval in ms, from 2 min to 24 hours
var randomInterval = randomIntFromInterval(120000, 84000000);
var AppointmentSchema = new mongoose.Schema({
    date: {
        type: String,
        default: Date.now() + randomInterval,
    },
    user: { type: String, required: true },
    doctor: { type: String, required: true },
    active: { type: Boolean, default: false },
});
module.exports = mongoose.model('Appointment', AppointmentSchema);
