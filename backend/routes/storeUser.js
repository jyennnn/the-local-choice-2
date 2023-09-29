const express = require('express');
const router = express.Router();
const storeController = require('../controllers/stores');
const isUserAuthenticated = require('../middleware/isUserAuthenticated');

router.get('/', storeController.index);
router.get('/:id', isUserAuthenticated("user"), storeController.show);

module.exports = router;