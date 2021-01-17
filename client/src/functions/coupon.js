import axios from 'axios';

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: { authtoken }
    }
  );

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const deleteCoupon = async (_id, authtoken) => {
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${_id}`, {
    headers: { authtoken }
  });
};
