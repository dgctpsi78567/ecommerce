import React, { useState } from "react";
import { toast } from "react-toastify";
import UseNav from "../../components/nav/UseNav";
import { auth } from "../../Firebase";

const Password = () => {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const updatePasswordForm = () => {

        const HandleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            console.log("sdfsdfsdf", password);
            await auth.currentUser.updatePassword(password).then(() => {
                setLoading(false)
                toast.success("Password Updated")
            }).catch((err) => {
                setLoading(false)
                toast.error(err.message)
            })
        }


        return (
            <div className="container">
                <h2 className="mb-2"> Update Your Password</h2>
                <div className="row">
                    <div className="col-7">
                        <form onSubmit={HandleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                            </div>
                            <button className="bg-success text-white btn mt-2" disabled={!password || password.length < 6 || loading}> Update </button>
                        </form>
                    </div>
                </div>

            </div>

        )

    }


    return <div className="row">
        <div className="col-2">
            <UseNav />
        </div>
        <div className="col">
            {updatePasswordForm()}
        </div>
    </div>
}


export default Password;
