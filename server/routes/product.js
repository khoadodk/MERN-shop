const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const {
  create,
  read,
  remove,
  listAll,
  update,
  list,
  productsCount,
  productStar,
  listRelated
} = require('../controllers/product');

// ORDER MATTERS
router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', productsCount);

router.get('/products/:count', listAll);
router.get('/product/:_id', read);
router.put('/product/:_id', authCheck, adminCheck, update);
router.delete('/product/:_id', authCheck, adminCheck, remove);

router.post('/products', list);
// rating
router.put('/product/star/:productId', authCheck, productStar);
// related
router.get('/product/related/:_id', listRelated);

module.exports = router;
