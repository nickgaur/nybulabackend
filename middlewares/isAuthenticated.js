module.exports.isAuthenticated = (req, res, next) => {
    if(!req.session.userID){
        return res.status(401).json({statusCode: 401, message: "Unauthorized User"}).redirect('/login');
    }
    next();
}