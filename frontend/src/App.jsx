import React from "react";

import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";

import Cart from "./page/Cart/Cart";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Home from "./page/Home/Home.jsx";
import ProductList from "./page/ProductList/ProductList";
import SingleProduct from "./page/SingleProduct/SingleProduct";
import Success from "./page/Success/Success";
import Admin from "./page/Admin/Admin";
import UserList from "./page/Admin/page/UserList/UserList";
import OrderList from "./page/Admin/page/OrderList/OrderList";
import SingleUser from "./page/Admin/page/SingleUser/SingleUser";
import AdminHome from "./page/Admin/page/AdminHome/AdminHome";
import NewUser from "./page/Admin/page/NewUser/NewUser";
import AdminProduct from "./page/Admin/page/AdminProduct/AdminProduct";
import NewProduct from "./page/Admin/page/NewProduct/NewProduct";
import EditProduct from "./page/Admin/page/EditProduct/EditProduct";
import AllProductList from "./page/ProductList/components/AllProductList";
import CPUProductList from "./page/ProductList/components/CPUProductList";
import GPUProductList from "./page/ProductList/components/GPUProductList";
import RAMProductList from "./page/ProductList/components/RAMProductList";
import MainboardProductList from "./page/ProductList/components/MainboardProductList";
import Order from "./page/Order/Order";
import SingleOrder from "./page/Admin/page/SingleOrder/SingleOrder";


const App = () => {
  const user = useSelector(state => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />}>
          <Route path="/products" element={<AllProductList />} />
          <Route path="/products/CPU" element={<CPUProductList />} />
          <Route path="/products/GPU" element={<GPUProductList />} />
          <Route path="/products/RAM" element={<RAMProductList />} />
          <Route path="/products/Mainboard" element={<MainboardProductList/>} />
        </Route>
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={user.accessToken ? <Order /> : <Navigate to="/login"/>} />
        <Route path="/login" element={user.accessToken ? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={user.isAdmin ? <Admin /> : <Home />}>
          <Route path="/admin" element={<AdminHome />}/>
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/:id" element={<SingleUser />} />
          <Route path="/admin/users/newUser" element={<NewUser />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/products/newProduct" element={<NewProduct />} />
          <Route path="/admin/products/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/orders/:id" element={<SingleOrder />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;