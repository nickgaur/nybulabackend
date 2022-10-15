const User = require('../models/User');
const Appointment = require('../models/Appointment');

module.exports.renderAppointmentForm = (req, res) => {
    res.status(201).render('appointment');
}

module.exports.postAppointmentForm = async (req, res) => {
    try {
        const { email } = req.body;
        const gUser = await User.findOne({ email });
        const userID = req.session.userID;
        const currentUser = await User.findById(userID);
        if(email !== currentUser.email && gUser && gUser.status){
            const newAppointment = new Appointment(req.body);
            newAppointment.guestUser = gUser._id;
            newAppointment.author = req.session.userID;
            // currentUser.appointmentsGiven.push(newAppointment);
            currentUser.appointmentsTaken.push(newAppointment);
            gUser.appointmentsGiven.push(newAppointment);
            await newAppointment.save();
            await currentUser.save();
            await gUser.save();
            res.redirect('/');
        }
        else {
            res.redirect("/appointments")
        }
    }
    catch(err){
        res.redirect('/appointments');
    }
}