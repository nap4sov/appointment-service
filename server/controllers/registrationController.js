const User = require('../models/User');
const Doctor = require('../models/Doctor');

// API endpoint: /register
// request body: { name: '', email: '', phone: '', type: 'user' | 'doc' }
// method: POST
const handleRegistration = async (req, res) => {
    const { email, phone, name, type } = req.body;

    if (!email || !phone || !name || !type) {
        return res.status(400).send('All the fields must be filled');
    }

    try {
        if (type === 'doc') {
            const existingEmail = await Doctor.findOne({ email: email });
            if (existingEmail) {
                console.log('A doctor with this email already exists');
                return res.status(400).send('A doctor with this email already exists');
            }
            const doctor = new Doctor({
                email,
                phone,
                name,
                type,
            });
            const savedDoctor = await doctor.save();
            console.log(`Successfully registered doctor ${doctor.name}`);
            res.json(savedDoctor);
        } else {
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail) {
                console.log('A user with this email already exists');
                return res.status(400).send('A user with this email already exists');
            }
            const user = new User({
                email,
                phone,
                name,
                type,
            });
            const savedUser = await user.save();
            console.log(`Successfully registered user ${user.name}`);
            res.json(savedUser);
        }
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = handleRegistration;
