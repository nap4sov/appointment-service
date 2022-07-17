const Doctor = require('../models/Doctor');

// API endpoint: /doctors
// method: GET
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.send(error.message);
    }
};

// API endpoint: /doctors/doctorId
// method: DELETE
const deleteDoctor = async (req, res) => {
    try {
        const doctorToRemove = await Doctor.deleteOne({ _id: req.params.doctorId });
        res.json(doctorToRemove);
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getAllDoctors, deleteDoctor };
