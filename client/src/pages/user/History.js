import React, { useEffect, useState } from "react";
import UseNav from "../../components/nav/UseNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/card/ShowPaymentInfo";

const History = () => {

  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, [])

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    })
  }


  const showOrderInTable = (order) => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>

        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>
                <b>{p.product.title}</b>
              </td>
              <td>{p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === "Yes" ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }


  const showEachOrders = () => {
    return (
      orders.map((order, i) => (
        <div key={i} className="m-5 p-3 card">
          <ShowPaymentInfo order={order} />
          {showOrderInTable(order)}
          <div className="row">
            <div className="col">
              <p>PDF download</p>
            </div>
          </div>
        </div>
      ))
    )
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UseNav />

        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
}
export default History;
