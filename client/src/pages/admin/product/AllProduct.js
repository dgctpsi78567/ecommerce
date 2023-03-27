import React, { useEffect, useState } from 'react'
import AdminProductCard from '../../../components/card/AdminProductCard';
import AdminNav from '../../../components/nav/AdminNav';
import { getlistProducts, removeProducts } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AllProduct = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        return loadProductList();
    }, [])

    const loadProductList = () => {
        getlistProducts(100).then((res) => {
            setProducts(res.data)
            setLoading(false);
        }).catch((err) => {
            console.log("Product Get Error", err);
        })
    }

    const handleRemove = (slug) => {
        console.log(slug, user.token);
        let confirmation = window.confirm("Delete or Not");
        if (confirmation)
            // console.log("Data Id is",`${slug}`);
            removeProducts(slug, user.token).then((res) => {
                loadProductList();
                toast.error(`${res.data} is deleted`)
            }).catch((err) => {
                        //  if (err.response.status === 400) toast.error(err.response.data)
            toast.error(err.response.data.error);
            toast.error(err.response.data.error);

            })


    }



    return (
        <React.Fragment>

            <div className="container">
                <div className="row">
                    <div className="col-2"><AdminNav /></div>
                    <div className="col">
                        <h3> List Of All Product   </h3>
                        {loading ? <h4 className='text-danger'>Loading...</h4> : (
                            <div className='row'>
                                {product.map((products) => {
                                    return (
                                        <div className="col-4">
                                            <AdminProductCard products={products} handleRemove={handleRemove} />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default AllProduct