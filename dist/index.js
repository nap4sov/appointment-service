"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var moment = require("moment");
var _a = require('./services/cronTimer'), watchOutdatedAppointments = _a.watchOutdatedAppointments, logToFileDaily = _a.logToFileDaily, logToFileHourly = _a.logToFileHourly;
require('dotenv/config');
app.use(cors());
app.use(bodyParser.json());
watchOutdatedAppointments.start();
logToFileDaily.start();
logToFileHourly.start();
var usersRouter = require('./routes/user');
app.use('/users', usersRouter);
var doctorsRouter = require('./routes/doctor');
app.use('/doctors', doctorsRouter);
var registrationRouter = require('./routes/registration');
app.use('/register', registrationRouter);
var appointmentRouter = require('./routes/appointment');
app.use('/appointments', appointmentRouter);
mongoose.connect(process.env.DB_CONNECTION, function () {
    console.log('connected to DB');
});
app.listen(3333, function () {
    console.log('* * * * * * * * *\nApplication listening on port 3333!');
    console.log(moment().format('MMMM Do YYYY, HH:mm'));
});