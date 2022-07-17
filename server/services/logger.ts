const appRoot = require('app-root-path');
const { writeFile } = require('fs');
import moment = require('moment');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

export module logger {
    // logs to a file if active appointment is 23-25 hours ahead
    const dailyReminder = async () => {
        const currentDate = moment().format('MMMM Do YYYY, HH:mm');
        const startDate = (Date.now() + 80000000).toString();
        const endDate = (Date.now() + 90000000).toString();
        try {
            await Appointment.find({ date: { $gte: startDate, $lte: endDate }, active: true }).then(
                result => {
                    if (!result) {
                        return;
                    }
                    result.map(async ({ date, doctor, user }) => {
                        const doctorSpec = await Doctor.findById({ _id: doctor }).then(
                            res => res.spec,
                        );
                        const userName = await User.findById({ _id: user }).then(res => res.name);
                        const appointmentTime = moment(Number(date)).format('HH:mm');
                        const appointmentDate = moment(Number(date)).format('MMM_Do_HH:mm');
                        const message = `${currentDate} | Привет ${userName}! Напоминаем что вы записаны к ${doctorSpec} завтра в ${appointmentTime}!`;

                        await writeFile(
                            appRoot + `/logs/${appointmentDate}_${userName}.log`,
                            message,
                            err => {
                                if (err) {
                                    throw err;
                                }
                            },
                        );
                    });
                },
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    // logs to a file if active appointment is 117-123 minutes ahead
    const hourlyReminder = async () => {
        const currentDate = moment().format('MMMM Do YYYY, HH:mm');
        const startDate = (Date.now() + 7000000).toString();
        const endDate = (Date.now() + 7400000).toString();
        try {
            await Appointment.find({ date: { $gte: startDate, $lte: endDate }, active: true }).then(
                result => {
                    if (!result) {
                        return;
                    }
                    result.map(async ({ date, doctor, user }) => {
                        const doctorSpec = await Doctor.findById({ _id: doctor }).then(
                            res => res.spec,
                        );
                        const userName = await User.findById({ _id: user }).then(res => res.name);
                        const appointmentTime = moment(Number(date)).format('HH:mm');
                        const appointmentDate = moment(Number(date)).format('MMM_Do_HH:mm');
                        const message = `${currentDate} | Привет ${userName}! Вам через 2 часа к ${doctorSpec} в ${appointmentTime}!`;

                        await writeFile(
                            appRoot + `/logs/${appointmentDate}_${userName}.log`,
                            message,
                            err => {
                                if (err) {
                                    throw err;
                                }
                            },
                        );
                    });
                },
            );
        } catch (error) {
            console.log(error.message);
        }
    };
}
