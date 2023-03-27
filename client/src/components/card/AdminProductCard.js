import React from 'react'
import { Link } from 'react-router-dom';

const AdminProductCard=({products,handleRemove})=> {

  const {title,description,images,slug}=products;

  return (
    <React.Fragment>

<div className="card" style={{width: "12rem",height:"18rem"}}>
  <img src={images && images.length ? images[0].url:"https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png" } className="card-img-top" alt="..." style={{height:200}}/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description.substring(0,20)}</p>
  </div>
  <div className="row">
    <div className="col">
    <Link to={`/admin/products/${slug}`} className="btn text-success">Edit</Link>
    </div>
    <div className="col">
    <button className="btn text-danger" onClick={()=>handleRemove(slug)}>Delete</button>
    </div>
  </div>
</div>

</React.Fragment>
  )
}

export default AdminProductCard;