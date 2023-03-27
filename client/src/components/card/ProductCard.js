import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from "lodash"
import { Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux"


const ProductCard = ({ products }) => {

  const [tooltip, setToolTip] = useState("Click To Add");
  const { user, cart } = useSelector((state) => ({ ...state }))
  let dispatch = useDispatch();

  const handleToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
        console.log("loi", cart);
      }
      // push in cart 
      cart.push({ ...products, count: 1 });
      // remove duplicate
      let unique = _.uniqWith(cart, _.isEqual)
      // save to localstorage 
      console.log("dddd", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setToolTip("Added")

      dispatch({
        type:"ADD_TO_CART",
        payload:unique
      })

      dispatch({
        type:"SET_VISIBLE",
        payload:true
      })

    }
  }

  const { title, description, images, slug } = products;

  return (
    <React.Fragment>
      {products && products.ratings && products.ratings.length > 0 ? showAverage(products) : <span className="text-danger">No Ratings yet</span>}
      <div className="card" style={{ width: "15rem" }}>
        <img src={images && images.length ? images[0].url : "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png"} className="card-img-top" alt="..." style={{ height: 200 }} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description.substring(0, 20)}</p>
        </div>
        <div className="row">
          <div className="col">
            <Link to={`/product/${slug}`} className="btn text-success">View</Link>
          </div>
          <div className="col">
            <Tooltip title={tooltip}>
              <button className="btn text-danger" onClick={handleToCart} disabled={products.quantity < 1}>{products.quantity < 1 ? "Out Of Stock": "Add to Cart"}</button>
            </Tooltip>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default ProductCard