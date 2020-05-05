const { Router } = require('express');
const router = Router();

router.use(require('../controllers/index'));

module.exports = router;