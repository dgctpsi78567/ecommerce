import axios from "axios";

export const createorUpdateUser = async (authToken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update`,{},{ headers: { authToken } })
  }


export const userCurrent = async (authToken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/user-current`,{},{ headers: { authToken } })
  }



  export const adminCurrent = async (authToken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/admin-current`,{},{ headers: { authToken } })
  }


