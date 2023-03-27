import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../Firebase'

import { useDispatch } from 'react-redux';
import { createorUpdateUser } from '../../functions/auth'; 

const RegisterComplete = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let dispatch=useDispatch();


    useEffect(() => {
        setEmail(window.localStorage.getItem("EmailSignup", email))
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email an Password is requires")
            return;
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href,)
            if (result.user.emailVerified) {
                window.localStorage.removeItem("EmailSignup")
                // get token Id 
                let user = auth.currentUser;
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult();

                createorUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        })
                    }).catch((err)=>console.log(err));
            }

        } catch (e) {
            console.log(e)
            toast.error(e.message)
        }
    }

    const registerCompleteForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" value={email} className="form-control" disabled />
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" placeholder='Enter Your Password' />
                    <button type="submit" className="btn btn-primary mb-3">Regsiter</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            <h2 className="h2 text-center mt-5">Register Complete Page</h2>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md">
                        {registerCompleteForm()}
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default RegisterComplete