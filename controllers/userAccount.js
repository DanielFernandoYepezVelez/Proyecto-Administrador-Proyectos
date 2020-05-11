const { Router } = require('express');
const router = Router();

const User = require('../models/Users');
const { validateEmail } = require('../helpers/validateEmail');
const { sendEmail } = require('../handlers/email');

router.get('/user/newAccount', (req, res) => {
    res.render('./createAccount', {
        errors: res.locals.errors,
        title: 'Crear Cuenta En UpTask'
    });
});

router.post('/user/createAccount', async(req, res) => {
    const { email, password } = req.body;

    try {
        const userConfirm = await User.findOne({ where: { email } });

        if (userConfirm) {
            req.flash('error', 'El Correo Eléctronico Ya Existe');
            return res.redirect('/user/newAccount');
        }

        await User.create({
            email,
            password
        });

        /* Crear Una URL de confirmar cuenta */
        /* Este paso es como el de resetUrl */
        const accountConfirmUrl = `http://${req.headers.host}/user/accountConfirm/${email}`;

        /* Crear El Objeto De Usuario */
        const user = {
            email
        }

        /* Enviar Email */
        /* Function Muy Dinamica Para El Envio De Emails */
        /* Solo Funciona En pug Por importa un metodo del template
        de pug(OJO!!!) */
        await sendEmail({
            user,
            subject: 'Confirmar Cuenta UpTask',
            accountConfirmUrl,
            view: 'accountConfirm'
        });

        /* Redirigir Al Usuario */
        req.flash('correcto', 'Enviamos Un Correo Eléctronico Para Confirmar Tu Cuenta');
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

/* Cambia el estado de la cuenta para ver su confirmacion */
router.get('/user/accountConfirm/:email', async(req, res) => {
    const { email } = req.params;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        req.flash('error', 'Cuenta De Usuario No Existe');
        res.redirect('/user/newAccount');
    }

    /* Guardo Una Nueva Copia Del Usuario Sin Necesidad Del Update, Solo Necesito Un Save con el nuevo estado */
    user.activo = 1;
    await user.save();

    req.flash('correcto', 'Cuenta Activada Exitosamente');
    res.redirect('/user/signIn');
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