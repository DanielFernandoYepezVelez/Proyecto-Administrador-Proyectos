const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Hola Mundo Para El Navegador');
});

module.exports = router;