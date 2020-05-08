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

        res.redirect('/user/sign-in');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));

        res.render('createAccount', {
            errors: req.flash(),
            title: 'Crear Cuenta En UpTask'
        });
    }
});


module.exports = router;