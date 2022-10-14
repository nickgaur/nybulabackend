const userModel = require('../models/User');

module.exports.renderRegisterPage = (req, res) => {
    res.status(201).render('signup');
}

module.exports.postRegisterForm = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isUserExist = await userModel.findOne({email});
        if (!isUserExist) {
            const newUser = new userModel({ name, email, password });
            await newUser.save();
            res.redirect('/login');
        }
        else {
            console.log("User Already Exist");
            res.redirect('/register');
        }
    }
    catch (err) {
        console.log("User Already Exist");
        res.redirect('/register');
    }
}