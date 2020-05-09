const db = require('../config/database');

/* CONFIRMA SI ESTOY CONECTADO AL SERVIDOR DE LA BASE DE DATOS */
db.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

/* ME CREA LA TABLA DIRECTAMENTE EN LA BASE DE DATOS */
// require('../models/Projects');
// require('../models/Tasks');

// db.sync()
//     .then(() => console.log('Database Connected And Create Table'))
//     .catch(err => console.log(err));