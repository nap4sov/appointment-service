"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DoctorSchema = new mongoose.Schema({
    email: { type: String, required: true },
    reg_token: String,
    photo_avatar: { type: String, default: '' },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: 'doc' },
    spec: { type: String, default: 'therapist' },
    free: { type: Boolean, default: true },
    appointments_accepted: { type: Array, default: [] },
});
module.exports = mongoose.model('Doctor', DoctorSchema);
