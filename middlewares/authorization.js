const passport = require('passport');

exports.authorizationUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/user/signIn');
}