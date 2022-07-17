"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var handleRegistration = require('../controllers/registrationController');
router.post('/', handleRegistration);
module.exports = router;
