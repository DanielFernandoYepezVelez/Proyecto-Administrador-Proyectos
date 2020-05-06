const { vardump } = require('../helpers/vardump');

/* Crea Una Variable(vardump) que esta disponible en todo el proyecto solo al poner su nombre, es requerida, en cualquier lugar del proyecto */
exports.vardump = (req, res, next) => {
    res.locals.vardump = vardump;
    res.locals.year = new Date().getFullYear();
    next();
}