const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const { create, read, list } = require('../controllers/product');

router.post('/product', authCheck, adminCheck, create);
router.get('/products', list);
router.get('/product/:slug', read);

module.exports = router;
