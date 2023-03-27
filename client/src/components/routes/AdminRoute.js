import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { adminCurrent } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";


const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            adminCurrent(user.token).then((res) => {
                console.log("Current Admin Res", res)
                setOk(true)
            }).catch((err) => {
                console.log("Admin Rout Err", err);
                setOk(false)
            })
        }
    }, [user])

    return ok ? (
        children
    ) : (
        <LoadingToRedirect />
    );
}

export default AdminRoute;