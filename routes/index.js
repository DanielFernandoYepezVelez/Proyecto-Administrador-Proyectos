const { Router } = require('express');
const router = Router();

router.use(require('../controllers/projects'));
router.use(require('../controllers/tasks'));
router.use(require('../controllers/userAccount'));

module.exports = router;