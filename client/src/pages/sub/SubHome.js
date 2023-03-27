import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/card/ProductCard';
import { getSub } from '../../functions/sub';

const SubHome = () => {
    const { slug } = useParams();
    const [subs, setSubs] = useState({});
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getSub(slug).then((res) => {
            setSubs(res.data.sub);
            setProduct(res.data.product);
        })
    }, [])
    return (
        <div>

            <div className="h3 text-center p-3 bg-light mt-2">
                {product.length} Product in {subs.name}
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

export default SubHome