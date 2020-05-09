exports.userConnected = (req, res, next) => {
    /* Gracias A La Autenticación Yo Mando Una Propiedad User */
    res.locals.user = {...req.user } || null;
    next();
}