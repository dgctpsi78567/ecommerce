import axios from "axios"

export const createPaymentIntent=async(authToken,coupan)=>{
return await axios.post(`${process.env.REACT_APP_API}/create-payment-intent`,{coupanApplied:coupan},
{
    headers:{
        authToken,
    }
}) 
}