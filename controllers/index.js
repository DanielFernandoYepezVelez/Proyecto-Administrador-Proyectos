const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/nuevo-proyecto', (req, res) => {
    res.send('Soy El Nuevo Proyecto');
    // res.render('main');
});

module.exports = router;