import React, { useEffect, useState } from 'react'
import { getlistProduct, productCount } from '../../functions/product';
import ProductCard from '../card/ProductCard';
import { Pagination } from "antd";


const NewArrivels = () => {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);


  useEffect(() => {
    loadAllProducts();
  }, [page])


  useEffect(() => {
    productCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getlistProduct("createdAt", "desc", page).then((res) => {
        setProduct(res.data);
      setLoading(false);
    });
  };

  return (
    <React.Fragment>
     { loading?"Loading...": <div className='container'>
        <div className='row border'>
          {product.map((products,index) => {
            return (
              <div className='col-3' key={index}>
                <ProductCard products={products} />
              </div>
            )
          })}
        </div>
      </div> }

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 9}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>






    </React.Fragment>
  )
}

export default NewArrivels