exports.connectFlash = (req, res, next) => {
    res.locals.errors = req.flash('error');
    res.locals.correcto = req.flash('correcto');
    next();
}