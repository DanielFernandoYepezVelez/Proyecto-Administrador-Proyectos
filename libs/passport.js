const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Users');
const { validateEmail } = require('../helpers/validateEmail');

passport.use(new localStrategy({
        /* Por defecto passport espera un usuario y password, pero yo lo puedo reescribir, como yo lo tenga en mi inicio de sesión */
        usernameField: 'email',
        passwordField: 'password',
    },
    async(email, password, done) => {
        try {
            const user = await Usuarios.findOne({
                where: {
                    email,
                    activo: 1
                }
            });

            /* Password Incorrecto */
            if (!user.passwordVerify(password)) {
                /* No hay error, no hay usuario, mando mensaje asi obligatoriamente */
                return done(null, false, {
                    message: 'Contraseña Incorrecta'
                });
            }

            /* Lo que retorna es done, Y DONE es un callback */
            return done(null, user);

        } catch (error) {
            /* Ese Usuario No Existe */
            return done(null, false, {
                message: 'Correo Eléctronico Incorrecto'
            })
        }
    }
));

/* Configuraciones Necesarias Para Passport */
/* Serializar El Uusuario */
/* Si Es Un Objeto Acceder A Sus Valores Internos */
passport.serializeUser((user, callback) => {
    callback(null, user);
});

/* Deserializar El Usuario */
/* Ponerlo Como Un Objeto PARA Acceder A Sus Valores Internos DESPUES */
passport.deserializeUser((user, callback) => {
    callback(null, user);
});

module.exports = passport;