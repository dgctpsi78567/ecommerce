import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { categoriesList } from '../../functions/category';


const CategoryList = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesList().then((c) => {
            setCategories(c.data);
        })
    }, [])

    return (
        <React.Fragment>
            
            <div className="container">
            <div className="row">
            {
                categories.map((c,index) => {
                    return (
                        <div className="col-2 card p-3 text-center border-1 mb-3 mx-4 bg-light text-dark" key={index}>
                        <Link to={`/category/${c.slug}`} className="fs-4 text-dark">{c.name}</Link> 
                        </div>
                    )
                })
            }
            </div>
            </div>

        </React.Fragment>

    )
}

export default CategoryList