import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        width: "100%",
        height: "50px",
        objectFit: "cover",
    };


    return <Drawer
        title={`Cart Items / ${cart.length}`}
        closable={true}
        placement="right"
        onClose={() => {
            dispatch({
                type: "SET_VISIBLE",
                payload: false
            })
        }}
        visible={drawer}
    >
        {cart.map((p) => (
            <div key={p._id} className="row">
                <div className="col">
                    {p.images[0] ? (
                        <>
                            <img src={p.images[0].url} style={imageStyle} />
                            <p className="text-center bg-secondary text-light">
                                {p.title} x {p.count}
                            </p>
                        </>
                    ) : (
                        <>
                            <img height="100px" width="100px" src="https://res.cloudinary.com/teepublic/image/private/s--OQcK-yz7--/c_crop,x_10,y_10/c_fit,h_1109/c_crop,g_north_west,h_1260,w_1260,x_-138,y_-76/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-138,y_-76/bo_0px_solid_white/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg" />
                            <p className="text-center bg-secondary text-light">
                                {p.title} x {p.count}
                            </p>
                        </>
                    )}
                </div>
            </div>
        ))}
        <Link to="/cart">
            <button
                onClick={() =>
                    dispatch({
                        type: "SET_VISIBLE",
                        payload: false,
                    })
                }
                className="text-center btn btn-primary btn-raised btn-block"
            >
                Go To Cart
            </button>
        </Link>
    </Drawer>;
};

export default SideDrawer;
