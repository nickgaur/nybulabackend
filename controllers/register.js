const userModel = require('../models/User');

module.exports.renderRegisterPage = (req, res) => {
    res.status(201).render('signup');
}

module.exports.postRegisterForm = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userModel({ name, email, password });
        await newUser.save();
        res.redirect('/login');
    }
    catch (err) {
        console.log("User Already Exist");
        res.redirect('/register');
    }
}