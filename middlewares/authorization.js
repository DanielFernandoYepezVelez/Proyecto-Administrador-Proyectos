exports.authorizationUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }

    return res.redirect('/user/signIn');
}