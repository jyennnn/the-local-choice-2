const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isUserAuthenticated');
// const requireRole = require('../middlewares/requireRole');
const storeController = require('../controllers/stores');

router.get('/', isUserAuthenticated("admin"), storeController.index);
router.get('/:id', isUserAuthenticated("admin"), storeController.show);
router.post('/', isUserAuthenticated("admin"), storeController.create);
router.put('/:id', isUserAuthenticated("admin"), storeController.updateOne);
router.delete('/:id', isUserAuthenticated("admin"), storeController.deleteStore);

// router.get('/new', isUserAuthenticated, storeController.new);

module.exports = router;