import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import ProductCard from '../components/card/ProductCard';
import SingleProduct from '../components/card/SingleProduct';
import { getProduct, productStar, getproductRelated } from '../functions/product';


const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState({});
  const [star, setStar] = useState();
  const { user } = useSelector((state) => ({ ...state }));


  useEffect(() => {
    loadSingleProduct();
  }, [slug])

  useEffect(() => {
    if (product.ratings && user) {
      let exitingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      )
      exitingRatingObject && setStar(exitingRatingObject.star);
      console.log(exitingRatingObject);
    }
  }, [])



  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load Related
      getproductRelated(res.data._id).then((res) => setRelated(res.data))
    })
  }

  const handleStar = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  }

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} handleStar={handleStar} star={star} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
          <div className="container">
<div className="row">

          {related.length ? (
            related.map((r, index) => {
              return (
                <div key={index} className="col">
                  <ProductCard products={r} />
                </div>
              )
            })
          ) : "No Releted Product"}
</div>
</div>
        </div>
      </div>
    </div>
  )
}

export default Product