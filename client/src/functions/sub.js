import axios from "axios";

export const createSub = async (sub,authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/sub`,sub,{
        headers: {
            authToken
        }
    })
}

export const subsList = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/subs`);
}

export const getSub = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)
}

export const  updateSub= async (slug,category,authToken) => {
    console.log("FFF", slug , category, authToken)
    return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,category,{
        headers:{
            authToken,
        }
    })
}


export const  removeSub= async (slug,authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,{
        headers:{
            authToken,
        }
    })
}