import React, { useEffect, useState } from 'react';
// import { auth } from "../../Firebase"
import {getAuth,sendSignInLinkToEmail} from "firebase/auth"
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [email, setEmail] = useState("");

  const { user } = useSelector(state => ({ ...state }))

  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.token) navigate("/")
  }, [user,navigate])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTRATION_REDIRECT_URL,
      handleCodeInApp: true,
    }

    const auth=getAuth();

    sendSignInLinkToEmail(auth,email, config);
    toast.success(`Email is sent to ${email}`);
    console.log("dsdasd",process.env.REACT_APP_REGISTRATION_REDIRECT_URL)
    console.log(auth,email, config);
    console.log("Email sent successfully", email)
    window.localStorage.setItem("EmailSignup", email);

  }

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          <button type="submit" className="btn btn-primary mb-3">Regsiter</button>
        </div>
      </form>
    )
  }

  return (
    <React.Fragment>
      <h2 className="h2 text-center mt-5">Register Page</h2>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md">
            {registerForm()}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Register