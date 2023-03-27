import React, { useEffect, useState } from 'react';
import { auth } from "../../Firebase"
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.token) navigate("/");
    }, [user,navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD,
            handleCodeInApp: true,
        }
        await auth.sendPasswordResetEmail(email, config).then((result) => {
            setEmail('');
            setLoading(false);
            toast.success("Check Your Email for Password reset Link");
            console.log("ffff", result, email, config);
        }).catch((err) => {
            setLoading(false)
            toast.error(err.message)
        })
    }


    const loginForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                    <button type="submit" className="btn btn-primary mb-3" disabled={!email}>Forgot Password</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            <h2 className="h2 text-center mt-5">Forgoet Password Page</h2>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">{loading}</div>
                    <div className="col-md">
                        {loginForm()}
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ForgotPassword