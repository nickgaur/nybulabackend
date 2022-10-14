const User = require("../models/User");

module.exports.renderProfilePage = async (req, res) => {
    const userId = req.session.userID;
    const currentUser = await User.findById(userId);
    res.render('profile', { currentUser });
}

module.exports.editProfile = async (req, res) => {
    const userId = req.session.userID;
    const currentUser = await User.findById(userId);
    res.render('edit', { currentUser });
}

module.exports.postEditForm = async (req, res) => {
    const { name, password, status } = req.body;
    const user = await User.findByIdAndUpdate(req.session.userID, { name, password, status });
    res.redirect("/profile");
}