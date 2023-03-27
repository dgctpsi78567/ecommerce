
import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from "react-redux";
import { categoriesList } from "../../../functions/category"
import { toast } from "react-toastify";
import CategoryForm from '../../../components/form/CategoryForm';
import { updateSub, getSub } from '../../../functions/sub';
import { useNavigate, useParams } from 'react-router-dom';


const SubUpdate = () => {
    const { slug } = useParams();
    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
        loadSub();
    }, [])


    const loadCategories = () => {
        categoriesList().then((res) => setCategories(res.data));
    }


    const loadSub = () => {
        getSub(slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        }).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(slug, { name, parent }, user.token).then((res) => {
            setLoading(true);
            setName("")
            toast.success(`${res.data.name}`, "Updated Successfully");
            navigate("/admin/sub")
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data)
        })
    }


    return (
        <React.Fragment>
            <div className="container">
                <div className="row mt-3">
                    {
                        loading === true ? <h2> Loading</h2> : <h2> Update Category</h2>
                    }
                    <div className="col-2"><AdminNav /></div>
                    <div className="col">
                        <div className="h2">Select Category</div>
                        <select className='form-select mb-3' onChange={((e) => setParent(e.target.value))}>
                            <option> Please Select</option>

                            {categories.length > 0 && categories.map((c) => {
                                return (
                                    <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>
                                )
                            })}
                        </select>
                        <CategoryForm HandleSubmit={HandleSubmit} name={name} setName={setName} />

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubUpdate;