import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product"
import { toast } from "react-toastify";
import ProductForm from '../../../components/form/ProductForm';
import { categoriesList, getSubs } from '../../../functions/category';
import FileUpload from '../../../components/form/FileUpload';


const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    sub: [],
    shipping: "",
    quantity:"50",
    images: [],
    colors: ["Black", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: ""
};



const CreateProduct = () => {
    const [values, setValue] = useState(initialState);
    const [subsOption, setSubsOption] = useState([]);
    const [showSubs, setShowSub] = useState(false);
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        categoriesList().then((res) => setValue({ ...values, categories: res.data }));
    }

    const handleClickChange = (e) => {
        e.preventDefault();
        console.log("Click Category Id", e.target.value)
        setValue({ ...values,category: e.target.value });
        getSubs(e.target.value).then((res) => {
            console.log("Sub Option", res);
            setSubsOption(res.data);
        });
        setShowSub(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token).then((res) => {
            window.alert(`${res.data.title} created Successfully`);
            // window.location.reload();
            console.log(res);

        }).catch((err) => {
            console.log(err);
            // if (err.response.status === 400) toast.error(err.response.data)
            toast.error(err.response.data.error);
        })
    }


    const handleChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row mt-3"><div className="col-2"><AdminNav /></div>
                    <div className="col">
                    <FileUpload values={values} setValue={setValue} />

                        <ProductForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValue={setValue}
                            values={values}
                            handleClickChange={handleClickChange}
                            subsOption={subsOption}
                            showSubs={showSubs}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreateProduct;