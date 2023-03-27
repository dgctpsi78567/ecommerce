import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from './pages/auth/RegisterComplete';
import { useDispatch } from 'react-redux';
import { auth } from './Firebase';
import ForgotPassword from './pages/auth/ForgotPassword';
import { userCurrent } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import  History  from './pages/user/History';
import  Password  from './pages/user/Password';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/category/CreateCategory';
import UpdateCategory from './pages/admin/category/UpdateCategory';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/UpdateSub';
import CreateProduct from './pages/admin/product/CreateProduct';
import AllProduct from './pages/admin/product/AllProduct';
import UpdateProduct from './pages/admin/product/UpdateProduct';
import "bootstrap/dist/css/bootstrap.min.css"
import Product from './pages/Product';
import "antd/dist/antd.min.css"
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import SideDrawer from './components/drawer/SideDrawer';
import Checkout from './pages/Checkout';
import CreateCouponPage from './pages/admin/coupan/CreateCoupan';
import Payment from './pages/Payment';

const App = () => {

const dispatch=useDispatch()
useEffect(() => {
  const unsubscribe=auth.onAuthStateChanged(async (user)=>{
    if(user){
      const idTokenResult=await user.getIdTokenResult();

      userCurrent(idTokenResult.token)
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
  })

  return () => unsubscribe();
}, [dispatch])




  return (
    <React.Fragment>
        <Header/>
        <SideDrawer />
        <ToastContainer/>
      <Routes>
        
        <Route path="/" exact element={<Home />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register/complete" exact element={<RegisterComplete />} />
        <Route path="/forgot/password" exact element={<ForgotPassword />} />
        <Route path="/user/history" exact element={ <UserRoute>  <History/> </UserRoute>}  />
        <Route path="/user/password" exact element={ <UserRoute>  <Password/> </UserRoute>}  />
        <Route path="/admin/dashboard" exact element={ <AdminRoute>  <AdminDashboard/> </AdminRoute>}  />
        <Route path="/admin/category" exact element={ <AdminRoute>  <CreateCategory/> </AdminRoute>}  />
        <Route path="/admin/category/:slug" exact element={ <AdminRoute>  <UpdateCategory/> </AdminRoute>}  />
        <Route path="/admin/sub" exact element={ <AdminRoute>  <SubCreate/> </AdminRoute>}  />
        <Route path="/admin/sub/:slug" exact element={ <AdminRoute>  <SubUpdate/> </AdminRoute>}  />
        <Route path="/admin/product" exact element={ <AdminRoute>  <CreateProduct/> </AdminRoute>}  />
        <Route path="/admin/products" exact element={ <AdminRoute>  <AllProduct/> </AdminRoute>}  />
        <Route path="/admin/products/:slug" exact element={ <AdminRoute>  <UpdateProduct/> </AdminRoute>}  />
        <Route path="/product/:slug" exact element={<Product />} />
        <Route path="/category/:slug" exact element={<CategoryHome />} />
        <Route path="/sub/:slug" exact element={<SubHome />} />
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/checkout" exact element={ <UserRoute>  <Checkout/> </UserRoute>}  />
        <Route path="/admin/coupan" exact element={ <AdminRoute>  <CreateCouponPage/> </AdminRoute>}  />
        <Route path="/payment" exact element={ <UserRoute>  <Payment/> </UserRoute>}  />


</Routes>
    </React.Fragment>
  );
}

export default App;
