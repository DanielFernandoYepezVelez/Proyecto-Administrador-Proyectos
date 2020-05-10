/* Este Arcivo Contiene toda la parte de Nodemailer */
const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice'); // Permite Agregar Estilos Lineales
const htmlToText = require('html-to-text'); // Convertir El html a texto plano
const util = require('util');

/* Trae Las Credenciales de MailTrap*/
const emailConfig = require('../config/email');

/* Aqui se crean los email con nodemailer */
let transport = nodemailer.createTransport({
    host: emailConfig.Host,
    port: emailConfig.Port,
    auth: {
        user: emailConfig.Username, // generated ethereal user
        pass: emailConfig.Password // generated ethereal password
    }
});

/* Generar HTML */
const generarHTML = (view, options = {}) => {
    /* Aqui Pug Lo Que Hace Es Importar El Siguiente Archivo */
    /* Pug a traves de la url u options va a mapear las variables que tenga
    en su archivo y las va a incluir automaticamente, gracias a opciones se inyecta resetURL, que viene de la url del controlador authenticate */
    const html = pug.renderFile(`${__dirname}/../views/emails/${view}.pug`, options);

    /* Para Que Agregue Los Estilos Lineales */
    return juice(html)
}

exports.sendEmail = async(options) => {
    const html = generarHTML(options.view, options);
    const text = htmlToText.fromString(html);

    emailOptions = {
        from: 'UpTask <no-reply@uptask.com>', // sender address
        to: options.user.email, // list of receivers
        subject: options.subject, // Subject line
        text, // plain text body
        html // html body
    }

    /* Para que soporte promises */
    const emailPromise = util.promisify(transport.sendMail, transport);
    return emailPromise.call(transport, emailOptions);

    // send mail with defined transport object (No Soporta PROMESAS =>senMail())
    // transport.sendMail(emailOptions);
}