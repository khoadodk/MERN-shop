const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const {
  create,
  read,
  remove,
  listAll,
  update
} = require('../controllers/product');

router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
router.get('/product/:_id', read);
router.put('/product/:_id', authCheck, adminCheck, update);
router.delete('/product/:_id', authCheck, adminCheck, remove);

module.exports = router;
