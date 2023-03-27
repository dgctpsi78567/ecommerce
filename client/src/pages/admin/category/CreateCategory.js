import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from "react-redux";
import { createCategory, removeCategory, categoriesList } from "../../../functions/category"
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/form/CategoryForm';
import LocalSearch from '../../../components/form/LocalSearch';


const CreateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [keyword,setkeyword]=useState("");

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        categoriesList().then((res) => setCategory(res.data));
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token).then((res) => {
            setLoading(true);
            setName("")
            toast.success(`${res.data.name}`, "created Successfully");
            loadCategories();
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data)
        })
    }

    const searched=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword);
    

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeCategory(slug, user.token).then((res) => {
                setLoading(false);
                toast.error(`${slug} is deleted`)
                loadCategories();
            }).catch((err) => {
                if (err.response.status === 400) {
                    setLoading(false);
                    toast.error(err.response.data);
                }
            })
        }

    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row mt-3">
                    {
                        loading === true ? <h2> Loading</h2> : <h2> Create Category</h2>
                    }
                    <div className="col-2"><AdminNav /></div>
                    <div className="col">
                        <CategoryForm HandleSubmit={HandleSubmit} name={name} setName={setName} />
                        <hr />
                        <h2>Category List</h2>

<LocalSearch keyword={keyword} setkeyword={setkeyword} />

                        {category.filter(searched(keyword)).map((c) => {
                            return (
                                <div key={c._id}>
                                    <div className="row">
                                        <div className="col-6">
                                            <span> {c.name}</span>
                                        </div>
                                        <div className="col-6">
                                            <Link to={`/admin/category/${c.slug}`} className='text-success mx-4'>Edit</Link>
                                            <button className='text-danger' onClick={() => handleRemove(c.slug)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CreateCategory;