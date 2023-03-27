import React from 'react'

const LocalSearch = ({ keyword, setkeyword }) => {


    const handleSeachChange = (e) => {
        e.preventDefault();
        setkeyword(e.target.value.toLowerCase());
    }

    return (
        <React.Fragment>
            <input type="search" placeholder='Filter' value={keyword} onChange={handleSeachChange} className="form-control p-3" />
        </React.Fragment>
    )
}

export default LocalSearch