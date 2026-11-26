const router = require('express').Router();
const controller = require('../controllers/product.controller');
const validate = require('../middleware/validate');
const requireAdmin = require('../middleware/adminAuth');
const { idParams, listQuery, createBody } = require('../validators/product.validator');

router.get('/', validate({ query: listQuery }), controller.list);
router.get('/:id', validate({ params: idParams }), controller.getOne);
router.post('/', requireAdmin, validate({ body: createBody }), controller.create);

module.exports = router;
