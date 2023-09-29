const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripes');
const isUserAuthenticated = require('../middleware/isUserAuthenticated');

router.post('/create-checkout-session', isUserAuthenticated("user"), stripeController.createCheckoutSession);
router.post('/scsuccess/:session_id', isUserAuthenticated("user"),  stripeController.createOrder);

module.exports = router;