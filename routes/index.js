const { Router } = require('express');
const router = Router();

router.use(require('../controllers/projects'));

module.exports = router;