const express = require('express');

const router = express.Router();

// middlewares
const { authCheck } = require('../middlewares/auth');

const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  listOrders,
  addToWishList,
  getProductsFromWishList,
  removeFromWishList
} = require('../controllers/user');

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);

// Coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);
router.post('/user/order', authCheck, createOrder);
router.get('/user/orders', authCheck, listOrders);

// Wishlist
router.post('/user/wishlist', authCheck, addToWishList);
router.get('/user/wishlist', authCheck, getProductsFromWishList);
router.put('/user/wishlist/:productId', authCheck, removeFromWishList);

module.exports = router;
