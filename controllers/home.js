const User = require('../models/User');
const Appointments = require('../models/Appointment');

module.exports.renderHomepage = async (req, res) => {
    const userId = req.session.userID;
    const currentUser = await User.findById(userId);
    const appointmentsTaken = [];
    for(let appointment of currentUser.appointmentsTaken){
        const foundAppointment = await Appointments.findById(appointment);
        appointmentsTaken.push(foundAppointment);
    }
    console.log(appointmentsTaken);
    res.status(201).render('index', {appointmentsTaken});
}