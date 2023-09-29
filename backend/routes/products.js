const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const isUserAuthenticated = require('../middleware/isUserAuthenticated');

router.post('/config/stores/:id/products', isUserAuthenticated("admin"), productsController.create);
router.get('/config/stores/:id/products/:productId', isUserAuthenticated(['user', 'admin']), productsController.show);
router.put('/config/stores/:id/products/:productId', isUserAuthenticated("admin"), productsController.updateOne);
router.delete('/config/stores/:id/products/:productId', isUserAuthenticated("admin"), productsController.deleteProduct);

module.exports = router;