require('./config/enviroment');
require('./database/connect');

/* Dependencies */
const bodyParser = require('body-parser'); //Nativa
const flash = require('connect-flash');
const express = require('express');
const path = require('path'); //Nativa

/* Settings */
const app = express();

/* Initializations */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views/'));

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(require('./middlewares/vardump').vardump);
app.use(require('./middlewares/connectFlash').connectFlash);

/* Routes */
app.use('/', require('./routes/index'));

/* Static Files */
// app.use(express.static(path.join(__dirname, './public/')));
app.use(express.static(path.join(__dirname, './public')));

/* Starting The Sever */
app.listen(process.env.PORT, () => {
    console.log(`Server On Port ${process.env.PORT}`);
});