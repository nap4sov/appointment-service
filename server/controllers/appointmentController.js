const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const moment = require('moment');

// API endpoint: /appointments
// method: GET
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();

        res.json(appointments);
    } catch (error) {
        res.send(error.message);
    }
};

// ----- create new appointment -----
// API endpoint: /userId?id=doctorId
// method: PATCH
const createAppointment = async (req, res) => {
    const doctorId = req.query.id;
    const userId = req.params.userId;

    const appointment = new Appointment({
        user: userId,
        doctor: doctorId,
    });

    try {
        const doctorToAppoint = await Doctor.findById({ _id: doctorId });
        if (!doctorToAppoint.free) {
            const message = `${doctorToAppoint.name} cannot accept any more appointments`;
            console.log(message);
            throw new Error(message);
        }
        appointment.save();
        const appointmentDate = moment(Number(appointment.date)).format('MMMM Do YYYY, HH:mm');
        const message = `Appointment scheduled at ${appointmentDate}, wait for your doctor to approve it`;
        console.log(message);
        res.send(message);
    } catch (error) {
        res.send(error.message);
    }
};

// ----- approve or decline appointment -----
// API endpoint: /doctorId?id=appointmentId
// request body: { appointments: {active: boolean} }
// method: PATCH
const updateAppointment = async (req, res) => {
    const appointmentId = req.query.id;
    const doctorId = req.params.doctorId;
    const isActive = req.body.active;

    try {
        const appointmentToUpdate = await Appointment.findById({ _id: appointmentId });
        if (!isActive) {
            appointmentToUpdate.deleteOne({ _id: appointmentId });
        }

        await Appointment.updateOne({ _id: appointmentId }, { $set: { active: isActive } });
        const appointmentToAdd = await Appointment.findById({ _id: appointmentId });

        const currentDoctor = await Doctor.findById({ _id: doctorId });
        await Doctor.updateOne(
            { _id: doctorId },
            {
                $set: {
                    appointments_accepted: [
                        ...currentDoctor.appointments_accepted,
                        appointmentToAdd,
                    ],
                },
            },
        );
        const doctorToUpdate = await Doctor.findById({ _id: doctorId });
        if (doctorToUpdate.appointments_accepted.length >= 3) {
            await Doctor.updateOne({ _id: doctorId }, { $set: { free: false } });
        }

        const userId = appointmentToAdd.user;
        const userToUpdate = await User.findById({ _id: userId });
        await User.updateOne(
            { _id: userId },
            {
                $set: {
                    appointments: [...userToUpdate.appointments, appointmentToAdd],
                },
            },
        );
        const message = `Appointment with id ${appointmentId} is accepted by doctor`;
        console.log(message);
        res.send(message);
    } catch (error) {
        res.send(error.message);
    }
};

// ----- delete appointment by id (from appointments collection only)-----
// API endpoint: /appointmentId
// method: DELETE
const deleteAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;

    try {
        await Appointment.deleteOne({ _id: appointmentId });
        const message = `Appointment with id ${appointmentId} is deleted`;
        console.log(message);
        res.send(message);
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getAppointments, createAppointment, updateAppointment, deleteAppointment };
