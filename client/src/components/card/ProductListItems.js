import React from 'react'
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';

const ProductListItems=({product})=> {
    const {
        title,
        description,
        price,
        category,
        sub,
        shipping,
        color,
        brand,
        quantity,
        sold,
      } = product;
    
      return (
        <ul className="list-group">
                <li className="list-group-item">
            <span className="label fw-bold label-default label-pill pull-xs-right">
               {title}
            </span>
          </li>
          <li className="list-group-item">
            <span className="labelsmall label-default label-pill pull-xs-right">
               {description}
            </span>
          </li>

          <li className="list-group-item">
            <span className="labelsmall label-default label-pill pull-xs-right">
          {product && product.ratings && product.ratings.length >0 ? showAverage(product):<span className="text-danger">No Ratings yet</span>}
            </span>
          </li>

          <li className="list-group-item">
            Price{" "}
            <span className="label label-default label-pill pull-xs-right">
              $ {price}
            </span>
          </li>
          {category && (
            <li className="list-group-item">
              Category{" "}
              <Link
                to={`/category/${category.slug}`}
                className="label label-default label-pill pull-xs-right"
              >
                {category.name}
              </Link>
            </li>
          )}
    
          {sub && (
            <li className="list-group-item">
              Sub Categories
              {sub.map((s) => (
                <Link
                  key={s._id}
                  to={`/sub/${s.slug}`}
                  className="label label-default label-pill pull-xs-right"
                >
                  {s.name}
                </Link>
              ))}
            </li>
          )}
    
          <li className="list-group-item">
            Shipping{" "}
            <span className="label label-default label-pill pull-xs-right">
              {shipping}
            </span>
          </li>
    
          <li className="list-group-item">
            Color{" "}
            <span className="label label-default label-pill pull-xs-right">
              {color}
            </span>
          </li>
    
          <li className="list-group-item">
            Brand{" "}
            <span className="label label-default label-pill pull-xs-right">
              {brand}
            </span>
          </li>
    
          <li className="list-group-item">
            Available{" "}
            <span className="label label-default label-pill pull-xs-right">
              {quantity}
            </span>
          </li>
    
          <li className="list-group-item">
            Sold{" "}
            <span className="label label-default label-pill pull-xs-right">
              {sold}
            </span>
          </li>
        </ul>
      );
    };
    

export default ProductListItems