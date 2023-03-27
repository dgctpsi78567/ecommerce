import axios from "axios";
export const userCart=async(cart,authToken)=>
  await axios.post(`${process.env.REACT_APP_API}/user/cart`,{cart}, {
        headers:{
            authToken,
        }
    })


export const getuserCart=async(authToken)=>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`,
    {
        headers:{
            authToken
        }
    })

export const emptyUserCart = async (authtoken) =>
await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
  headers: {
    authtoken,
  },
});


export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );



  export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const getUserOrders = async (authtoken) =>
  await axios.get(
    `${process.env.REACT_APP_API}/user/orders`,
    {
      headers: {
        authtoken,
      },
    }
  );

