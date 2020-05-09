const { Router } = require('express');
const router = Router();

const User = require('../models/Users');

router.get('/user/newAccount', (req, res) => {
    res.render('createAccount', {
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
    } catch (error) {
        /* Todos los errores, pasan a la categoria de error, y se le pasan a error flash despues de mapearlos y req.flash se asigna a mensajes */
        req.flash('error', error.errors.map(error => error.message));

        res.render('createAccount', {
            mensajes: req.flash(),
            title: 'Crear Cuenta En UpTask',
            email,
            password
        });
    }
});

router.get('/user/signIn', (req, res) => {
    const { error } = res.locals.mensajes;

    res.render('signIn', {
        title: 'Iniciar Sesión En Uptask',
        error
    });
});

module.exports = router;