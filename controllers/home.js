const User = require('../models/User');
const Appointments = require('../models/Appointment');
const Appointment = require('../models/Appointment');

module.exports.renderHomepage = async (req, res) => {
    const userId = req.session.userID;
    const currentUser = await User.findById(userId);
    const appointmentsTaken = [];
    for(let appointment of currentUser.appointmentsTaken){
        const helper = {};
        const foundAppointment = await Appointments.findById(appointment);
        const user = await User.findById(foundAppointment.guestUser);
        console.log(user.name)
        helper.obj = foundAppointment;
        helper.name = user.name;
        appointmentsTaken.push(helper);
    }
    // const tuv = await User.find
    console.log(appointmentsTaken);
    // console.log(appoint)
    res.status(201).render('index', {appointmentsTaken});
}