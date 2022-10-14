const User = require("../models/User");

module.exports.renderProfilePage = async (req, res) => {
    const userId = req.session.userID;
    const currentUser = await User.findById(userId); 
    res.render('profile', {currentUser});
}