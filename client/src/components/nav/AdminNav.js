import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <React.Fragment>
            <nav className="nav flex-column">
                <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/admin/product" className="nav-link">Product</Link>
                <Link to="/admin/products" className="nav-link">Products</Link>
                <Link to="/admin/category" className="nav-link">Category</Link>
                <Link to="/admin/sub" className="nav-link">Sub Category</Link>
                <Link to="/admin/coupan" className="nav-link">Coupans</Link>
                <Link to="/user/password" className="nav-link">Password</Link>
            </nav>
        </React.Fragment>
    )
}

export default AdminNav