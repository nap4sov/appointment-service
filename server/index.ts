const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
import moment = require('moment');
const {
    watchOutdatedAppointments,
    logToFileDaily,
    logToFileHourly,
} = require('./services/cronTimer');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

watchOutdatedAppointments.start();
logToFileDaily.start();
logToFileHourly.start();

const usersRouter = require('./routes/user');
app.use('/users', usersRouter);

const doctorsRouter = require('./routes/doctor');
app.use('/doctors', doctorsRouter);

const registrationRouter = require('./routes/registration');
app.use('/register', registrationRouter);

const appointmentRouter = require('./routes/appointment');
app.use('/appointments', appointmentRouter);

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to DB');
});

app.listen(3333, () => {
    console.log('* * * * * * * * *\nApplication listening on port 3333!');
    console.log(moment().format('MMMM Do YYYY, HH:mm'));
});
