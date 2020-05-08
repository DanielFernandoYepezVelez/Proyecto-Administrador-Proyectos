exports.connectFlash = (req, res, next) => {
    res.locals.errors = req.flash();
    res.locals.success = req.flash();
    next();
}