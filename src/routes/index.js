const router = require('express').Router();

router.use('/products', require('./product.routes'));
router.use('/categories', require('./category.routes'));

module.exports = router;
