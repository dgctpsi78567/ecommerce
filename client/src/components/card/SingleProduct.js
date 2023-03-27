import { Tooltip } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import RatingModel from '../../pages/model/RatingModel';
import ProductListItems from './ProductListItems';




const SingleProduct = ({ product,handleStar,star }) => {


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
        cart.push({ ...product, count: 1 });
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
  
      }
    }
    


    const { _id,images } = product;
    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        {images && images.length ? (
                            <div className="carousel-inner">
                                {images && images.map((i, index) => {
                                    return (
                                        <div className="carousel-item active">
                                            <img src={i.url} className="d-block w-100" alt="..." height="500" width="500" />
                                        </div>)
                                })}
                            </div>
                        ) : (<img src="" alt='' />)
                        }
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-6">

                    
                    <ProductListItems product={product} />
                    <div className="row mt-4">
                        <div className="col">
                        <Tooltip title={tooltip}>
              <button className="btn text-danger" onClick={handleToCart}>Add To Cart</button>
            </Tooltip>
                            <button className="btn-danger btn">Add To Wishlist</button>
                           <button className="btn btn-light ms-4"> 
                            <RatingModel>
                            <StarRatings name={_id} numberOfStars={5} rating={star}color={"red"} changeRating={handleStar} isSelectable={true} starRatedColor={"red"}/>
                            </RatingModel> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct