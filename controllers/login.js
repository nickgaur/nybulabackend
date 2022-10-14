const userModel = require('../models/User');

module.exports.renderLoginPage = (req, res) => {
    res.status(201).render('login');
}

module.exports.postLoginForm = async (req, res) => {
    try {
        const { email, password } = req.body;
        const currentUser = await userModel.findOne({ email });
        if (currentUser) {
            if (password === currentUser.password) {
                req.session.userID = currentUser._id;
                res.status(201).redirect('/');
            }
            else {
                console.log("Incorrect password");
                res.redirect('/login');
            }
        }
        else {
            console.log("User doesn't exist");
            res.status(401).redirect('/login');
        }
    }
    catch (err) {
        throw err;
    }
}