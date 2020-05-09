/* Llamados Requeridos */
const passport = require('./libs/passport');
require('./config/enviroment');
require('./database/connect');

/* Dependencies */
const expSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); //Nativa
const flash = require('connect-flash');
const express = require('express');
const path = require('path'); //Nativa

/* Settings */
const app = express();

/* Initializations */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
/* Esta es requerida para que las de abajo funcionen */
app.use(cookieParser());
/* Sessiones para que el usuario tenga una sesión en todas las paginas del proyecto que el entre */
app.use(expSession({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
/* Flash Necesita Sessiones */
app.use(require('./middlewares/connectFlash').connectFlash);
/* Aqui Va Ha Ir A Las libs De Passport */
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./middlewares/vardump').vardump);
app.use(require('./middlewares/userConnected').userConnected);

/* Routes */
app.use('/', require('./routes/index'));

/* Static Files */
// app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.join(__dirname, './public')));

/* Starting The Sever */
app.listen(process.env.PORT, () => {
    console.log(`Server On Port ${process.env.PORT}`);
});