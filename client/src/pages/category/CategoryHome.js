import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/card/ProductCard';
import { getCategory } from '../../functions/category';

const CategoryHome = () => {
    const { slug } = useParams();
    const [categories, setCategories] = useState({});
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getCategory(slug).then((res) => {
            setCategories(res.data.category);
            setProduct(res.data.product);
        })
    }, [])
    return (
        <div>

            <div className="h3 text-center p-3 bg-light mt-2">
                {product.length} Product in {categories.name}
            </div>

            <div className="container">
                <div className="row">
                    {product.length ? (
                        product.map((p, index) => {
                            return (
                                <div key={index} className="col">
                                    <ProductCard products={p} />
                                </div>
                            )
                        })
                    ) : "No Releted Product"}
                </div>                
            </div>
        </div>
    )
}

export default CategoryHome