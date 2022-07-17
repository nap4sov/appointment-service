"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    reg_token: String,
    photo_avatar: { type: String, default: '' },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: 'user' },
    appointments: { type: Array, default: [] },
});
module.exports = mongoose.model('User', UserSchema);
