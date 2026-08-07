import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import VerifyOtp from "../pages/VerifyOtp";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import Register from "../pages/Register";
import OrderSuccess from "../pages/OrderSuccess";


import AdminRoute from "./AdminRoute";

import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import Products from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Coupons from "../pages/admin/Coupons";
import Settings from "../pages/admin/Settings";


const AppRoutes = () => {
  return (
    <Routes>



      {/* Admin Routes */}

<Route element={<AdminRoute />}>
  <Route path="/admin/dashboard" element={<Dashboard />} />

  <Route path="/admin/categories" element={<Categories />} />

  <Route path="/admin/products" element={<Products />} />

  <Route path="/admin/products/add" element={<AddProduct />} />

  <Route
    path="/admin/products/edit/:id"
    element={<EditProduct />}
  />

  <Route path="/admin/orders" element={<Orders />} />

  <Route path="/admin/customers" element={<Customers />} />

  <Route path="/admin/coupons" element={<Coupons />} />

  <Route path="/admin/settings" element={<Settings />} />
</Route>

      {/* Public Routes */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        

<Route path="/verify-otp" element={<VerifyOtp />} />
      </Route>

      {/* Guest Routes */}

      <Route element={<GuestRoute />}>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Route>

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          <Route path="/cart" element={<Cart />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/order-success" element={<OrderSuccess />}/>

        </Route>

      </Route>

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;




