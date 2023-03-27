import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {CheckCircleOutlined,CloseCircleOutlined,CloseOutlined,} from "@ant-design/icons";
  

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Silver", "White", "Blue"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };


  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };


  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
                <img src={p.images[0].url} height="100px" width="100px" />
            ) : (
                <img height="100px" width="100px" src="https://res.cloudinary.com/teepublic/image/private/s--OQcK-yz7--/c_crop,x_10,y_10/c_fit,h_1109/c_crop,g_north_west,h_1260,w_1260,x_-138,y_-76/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-138,y_-76/bo_0px_solid_white/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg"  />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        </td>
        <td> {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}</td>
        <td> <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          /></td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
