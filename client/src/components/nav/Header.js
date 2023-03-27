import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase'
import Searchquery from '../form/Searchquery'


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user,cart } = useSelector((state) => ({ ...state }))

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    navigate("/login")
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          {user && (
            <Link className="navbar-brand" to="/">  {user.email && user.email.split("@")[0]} </Link>
          )}
          {!user && (
            <Link className="navbar-brand" to="/">  Navdbar </Link>
          )}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/shop">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/cart">Cart {cart.length} </Link>
              </li>
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                </li>
              )}

              {!user && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                </li>
              )}
            </ul>

            <Searchquery />
            {user && user.role === "subscriber" && (<Link to="/user/history">User Dashboard</Link>)}
            {user && user.role === "admin" && (<Link to="/admin/dashboard">Admin Dashboard</Link>)}
            {user && (
              <button className="btn btn-primary" onClick={logout}> Logout</button>
            )}
          </div>
        </div>
      </nav>





    </React.Fragment>
  )
}

export default Header