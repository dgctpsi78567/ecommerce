import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StarOutlined } from "@ant-design/icons"
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import {useNavigate, useParams} from "react-router-dom"



const RatingModel = ({ children }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [ modelVisible, setModelvisible ] = useState(false);
    const navigate=useNavigate();
    const {slug}= useParams();

    const HandleClick=()=>{
        if(user && user.token ){
            setModelvisible(true)
        }else{
            navigate("/login",
            {state:{from:`/product/${slug}`}}
            )
            
        }
    }
    return (
        <React.Fragment>
            <div onClick={HandleClick}>
                <StarOutlined className="text-danger" /> <br />
                {user ? "Leve Rating" : "Login to leave rating"}
            </div>
            <Modal
                title="Leave Your Rating"
                centered
                visible={modelVisible}
                onOk={() => {
                    setModelvisible(false)
                    toast.success("Thanks to Success Your Review")
                }}
                onCancel={()=>{
                    setModelvisible(false)
                }}
            >
                {children}
            </Modal>
        </React.Fragment>
    )
}

export default RatingModel