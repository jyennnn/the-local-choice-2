
const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isUserAuthenticated');
const orderController = require('../controllers/orderController');

router.get('/', isUserAuthenticated(["admin"]), orderController.getAllOrders);
router.put('/:id', isUserAuthenticated("admin"), orderController.updateOrderStatus);
router.delete('/:id', isUserAuthenticated("admin"), orderController.deleteOrder);
router.get('/myorders', isUserAuthenticated(["user"]), orderController.getMyOrders);


module.exports = router;
