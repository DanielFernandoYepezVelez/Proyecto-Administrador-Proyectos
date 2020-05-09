const { Router } = require('express');
const router = Router();

const User = require('../models/Users');
const { validateEmail } = require('../helpers/validateEmail');

router.get('/user/newAccount', (req, res) => {
    res.render('./createAccount', {
        title: 'Crear Cuenta En UpTask'
    });
});

router.post('/user/createAccount', async(req, res) => {
    const { email, password } = req.body;

    try {
        await User.create({
            email,
            password
        });

        res.redirect('/user/signIn');
    } catch {
        if (!email) req.flash('error', 'Campo Correo Eléctronico Esta Vacio');
        if (email && !validateEmail(email)) req.flash('error', 'Ingresar Un Correo Eléctronico Válido');
        if (!password) req.flash('error', 'Campo Contraseña Esta Vacio');

        /* Todos los errores, pasan a la categoria de error, y se le pasan a error flash despues de mapearlos y req.flash se asigna a mensajes */
        // req.flash('error', error.errors.map(error => error.message));

        res.render('./createAccount', {
            errors: req.flash('error'),
            title: 'Crear Cuenta En UpTask',
            email,
            password
        });
    }
});

router.get('/user/signIn', (req, res) => {
    /* Los Mensajes De Passport Se Asignan A Flash, Pero Solo A Su Vairable Global Que Esta En El Locals, Por Eso Es Importante Definirla Alli Y Passport Solo Necesita, El message Del Done()*/
    // console.log(res.locals.errors);
    // console.log(res.locals.correcto);

    res.render('./signIn', {
        title: 'Iniciar Sesión En Uptask',
        errors: res.locals.errors,
        success: res.locals.correcto
    });
});

module.exports = router;