const User = require('../models/User');
const Appointments = require('../models/Appointment');
// const Appointment = require('../models/Appointment');

module.exports.renderHomepage = async (req, res) => {
    try{
        const userId = req.session.userID;
        const currentUser = await User.findById(userId);
        const appointmentsTaken = [];
        for (let appointment of currentUser.appointmentsTaken) {
            const helper = {};
            const foundAppointment = await Appointments.findById(appointment);
            const user = await User.findById(foundAppointment.guestUser);
            helper.obj = foundAppointment;
            helper.name = user.name;
            // console.log(foundAppointment);
            appointmentsTaken.push(helper);
        }
        // console.log(appointmentsTaken);
        const appointmentsGiven = [];
        for (let appointment of currentUser.appointmentsGiven) {
            const helper = {};
            const foundAppointment = await Appointments.findById(appointment);
            const user = await User.findById(foundAppointment.guestUser);
            helper.obj = foundAppointment;
            helper.name = user.name;
            appointmentsGiven.push(helper);
        }
        res.status(201).render('index', { appointmentsTaken, appointmentsGiven });
    }
    catch(err){
        res.redirect("/login");
    }
}