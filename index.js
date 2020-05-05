require('./config/index');

/* Dependencies */
const express = require('express');
const path = require('path');

/* Settings */
const app = express();

/* Middlewares */

/* Routes */
app.use('/', require('./routes/index'));

/* Static Files */
app.use(express.static(path.join(__dirname, './public/')));

/* Starting The Sever */
app.listen(process.env.PORT, () => {
    console.log(`Server On Port ${process.env.PORT}`);
});