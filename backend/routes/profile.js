const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isUserAuthenticated');
const profileController = require('../controllers/profiles');

router.get('/', isUserAuthenticated('user'), profileController.getProfile);
router.put('/update', isUserAuthenticated('user'), profileController.updateProfile);

module.exports = router;