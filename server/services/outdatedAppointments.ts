const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

const updateDoctorAppointments = async (doctorId, appointmentId) => {
    const currentDoctor = await Doctor.findById({ _id: doctorId });
    await Doctor.updateOne(
        { _id: doctorId },
        {
            $set: {
                appointments_accepted: currentDoctor.appointments_accepted.reduce(
                    (newArr, appointment) => {
                        const objectId = appointment._id;
                        if (objectId.toString() !== appointmentId) {
                            return [...newArr, appointment];
                        }
                        return newArr;
                    },
                    [],
                ),
                free: true,
            },
        },
    );
};

const updateUserAppointments = async (userId, appointmentId) => {
    const currentUser = await User.findById({ _id: userId });
    await User.updateOne(
        { _id: userId },
        {
            $set: {
                appointments: currentUser.appointments.map(appointment => {
                    const objectId = appointment._id;
                    if (objectId.toString() !== appointmentId) {
                        return appointment;
                    }
                    return { ...appointment, active: false };
                }),
            },
        },
    );
};

export module outdatedAppointments {
    // if appointment time is < current time, it is deactivated in appointments collection
    // and user's appointments, as well as deleted from doctor's accepted appointments
    const updateOutdatedAppointments = () => {
        Appointment.find({ date: { $lt: Date.now().toString() } }).then(res => {
            res.map(async ({ id, active, doctor, user }) => {
                if (!active) {
                    return;
                }
                console.log(`Appointment with id ${id} is outdated, deactivating...`);
                await Appointment.updateOne({ _id: id }, { $set: { active: false } });
                await updateDoctorAppointments(doctor, id);
                await updateUserAppointments(user, id);
                console.log('Success');
            });
        });
    };
}
