import axios from 'axios';

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: { authtoken }
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: { authtoken }
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: { authtoken }
  });

export const saveAddress = async (address, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: { authtoken }
    }
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken
      }
    }
  );

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken
      }
    }
  );

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken
    }
  });

export const addToWishList = async (authtoken, productId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken
      }
    }
  );

export const removeFromWishList = async (authtoken, productId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken
      }
    }
  );

export const getProductsFromWishList = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken
    }
  });
