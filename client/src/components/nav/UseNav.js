import React from 'react'
import { Link } from 'react-router-dom'

const UseNav = () => {
    return (
        <React.Fragment>
            <nav className="nav flex-column">
                <Link to="/user/history" className="nav-link">User History</Link>
                <Link to="/user/password" className="nav-link">User Password</Link>
                <Link to="/user/wishlist" className="nav-link">User Wishlist</Link>
            </nav>
        </React.Fragment>
    )
}

export default UseNav