import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/card/ProductCardInCheckout";
import { userCart } from "../functions/user";


const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
      //   console.log(currentValue , nextValue.count , nextValue.price);

    }, 0);
  };

  const handleCheckLogin = () => {
    navigate("/login",
      { state: { from: `/cart` } }
    )
  }


  const saveOrderToDb = () => {
    userCart(cart, user.token).then((msg) => {
      console.log("Cart POST Res", msg);
      if (msg.data.ok) navigate("/checkout")
    }).catch((e) => console.log(e))
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}

    </table>
  );


  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              disabled={!cart.length}
              className="btn btn-sm btn-primary mt-2">
              Proceed to Checkout
            </button>
          ) : (
            <button onClick={handleCheckLogin} className="btn btn-sm btn-primary mt-2">

              Login to Checkout

            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
