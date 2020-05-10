const { Router } = require('express');
const passport = require('passport');
const Op = require('Sequelize').Op;
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const router = Router();

const Usuario = require('../models/Users');
const { sendEmail } = require('../handlers/email');

router.post('/user/signIn',
    passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/user/signIn',
        badRequestMessage: 'Ambos Campos Son Obligatorios'
    }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/user/signOut', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/user/signIn');
    })
});

router.get('/user/resetPassword', (req, res) => {
    /* Aqui Pasa Correctamente, Pero Si Se Queda En La Misma Vista */
    // console.log(res.locals.errors);

    res.render('resetPassword', {
        title: 'Reestablecer Constraseña',
        error: res.locals.errors
    });
});

/* Generamos token para guardarlo en la DB */
router.post('/user/tokenGenerate', async(req, res) => {
    const { email } = req.body;
    let user;

    try {
        /* Aqui Ya Tengo Los Datos De La Base De Datos Del Usuario Que voy A Modifcar o va a reestablecer la password */
        user = await Usuario.findOne({
            where: { email }
        });

        /* Generar Token Si Todo Esta Bien */
        user.token = crypto.randomBytes(20).toString('hex');
        user.expira = Date.now() + 3600000;

        /* Guardar En La Base De Datos El Usuario Con El Nuevo Token Y Expira*/
        await user.save();

        /* URL DE RESET */
        /* http://${req.headers.host} Me Entrega El Host Donde Esta Corriendo El Programa */
        const resetUrl = `http://${req.headers.host}/resetNewPassword/${user.token}`;

        /* Por eso utilizamos util, y le paso un objeto con opciones, no olvidar que todos los objetos en js se pasan por referencia, todo esto va para, handlers en email */
        await sendEmail({
            user,
            subject: 'Password Reset',
            resetUrl,
            view: 'resetPassword'
        });

        req.flash('correcto', 'Revisar El Correo Eléctronico');
        res.redirect('/user/signIn');
        // return res.redirect(`/resetNewPassword/${user.token}`);
    } catch {
        /* Verificar que el usuario Exista */
        if (!email) {
            req.flash('error', 'Campo Correo Eléctronico Esta Vacio');
            return res.redirect('/user/resetPassword');
        }

        if (!user) {
            req.flash('error', 'Correo Eléctronico No Existe');
            return res.redirect('/user/resetPassword');
        }
    }
});

/* Aqui Comparamos los tokens Para ver si el usuario existe */
router.get('/resetNewPassword/:token', async(req, res) => {
    const { token } = req.params;

    const user = await Usuario.findOne({ where: { token } });

    if (!user) {
        req.flash('error', 'Correo Electronico No Válido');
        res.redirect('/user/resetPassword');
    }

    res.render('resetNewPassword', {
        title: 'Ingresar Nueva Contraseña'
    });
});

/* Aqui Ya establecemos la nueva constraseña */
router.post('/resetNewPassword/:token', async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await Usuario.findOne({
        where: {
            token,
            expira: {
                [Op.gte]: Date.now()
            }
        }
    });

    if (!user) {
        req.flash('error', 'Correo No Válido');
        res.redirect('/user/resetPassword');
    }

    /* Hashear El Nuevo Password */
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    user.token = null;
    user.expira = null;

    await user.save();

    req.flash('correcto', 'Nueva Contraseña Exitosa');
    res.redirect('/user/signIn');
});

module.exports = router;