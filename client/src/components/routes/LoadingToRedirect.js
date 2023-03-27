import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let navigate = useNavigate();

    useEffect(() => {
        const intervel = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000)
        count === 0 && navigate("/")

        return () => clearInterval(intervel);
    }, [count,navigate]);

    return (
        <React.Fragment>
            <div className='container p-5 text-center'>
                <p>Redirecting you in {count} seconds </p>
            </div>
        </React.Fragment>
    )
}
export default LoadingToRedirect;