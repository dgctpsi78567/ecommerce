import axios from "axios";

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupans`);

export const removeCoupon = async (coupanId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupan/${coupanId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupan, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupan`,
    { coupan },
    {
      headers: {
        authtoken,
      },
    }
  );
