import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';

const Searchquery = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;
    let navigate = useNavigate();

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value },
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/shop?${text}`);
    }


    return (
        <React.Fragment>

            <form className="d-flex"  onSubmit={handleSubmit}>
              <input className="form-control me-2" value={text}  onChange={handleChange} type="search" placeholder="Search" aria-label="Search" />
              <button onClick={handleSubmit} className="btn btn-outline-success" type="submit">search</button>
            </form>




        </React.Fragment>
    )
}

export default Searchquery