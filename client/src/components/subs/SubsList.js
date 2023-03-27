import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {subsList } from '../../functions/sub';


const SubsList = () => {

    const [subs, setSubs] = useState([]);

    useEffect(() => {
        subsList().then((s) => {
            setSubs(s.data);
        })
    }, [])


    return (
        <React.Fragment>
            
            <div className="container">
            <div className="row">
            {
                subs.map((s,index) => {
                    return (
                        <div className="col-2 card p-3 text-center border-1 mb-3 mx-4 bg-light text-dark" key={index}>
                        <Link to={`/sub/${s.slug}`} className="fs-4 text-dark">{s.name}</Link> 
                        </div>
                    )
                })
            }
            </div>
            </div>

        </React.Fragment>

    )
}

export default SubsList