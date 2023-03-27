import axios from "axios";

export const createProduct = async (product,authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`,product,{
        headers: {
            authToken
        }
    })
}

export const getlistProducts=async (count)=>{
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}

export const getProduct=async (slug)=>{
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}

export const removeProducts=async (slug,authToken)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/products/${slug}`,{
        headers: {
            authToken
        }
    });
}

export const updateProduct=async (slug,product,authToken)=>{
    return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`,product,{
        headers:{
            authToken
        }
    })
}

export const getlistProduct=async (sort,order,page)=>{
    return await axios.post(`${process.env.REACT_APP_API}/products`,{
sort,order,page
    })
}



export const productCount=async()=>{
    return await axios.get(`${process.env.REACT_APP_API}/productcount/total`)
}

export const productStar=async (productId,star,authToken)=>{
    return await axios.put(`${process.env.REACT_APP_API}/productStar/${productId}`,{star},{
        headers:{
            authToken
        }
    })
}


export const getproductRelated=async (productId)=>{
    return await axios.get(`${process.env.REACT_APP_API}/productrelated/${productId}`)
}

export const filterSearch=async(arg)=>{
    return await axios.post(`${process.env.REACT_APP_API}/product/filters`,arg)
}








