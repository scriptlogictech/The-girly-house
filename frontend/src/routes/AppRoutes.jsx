import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import VerifyOtp from "../pages/VerifyOtp";
import NotFound from "../pages/NotFound";

// Guest Pages
import Login from "../pages/Login";
import Register from "../pages/Register";

// Protected Pages
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import Profile from "../pages/Profile";
import OrderSuccess from "../pages/OrderSuccess";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import AdminRoute from "./AdminRoute";

// Admin Pages
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

      {/* =====================================================
          ADMIN ROUTES
      ===================================================== */}

      <Route element={<AdminRoute />}>

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin/categories"
          element={<Categories />}
        />

        <Route
          path="/admin/products"
          element={<Products />}
        />

        <Route
          path="/admin/products/add"
          element={<AddProduct />}
        />

        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/admin/orders"
          element={<Orders />}
        />

        <Route
          path="/admin/customers"
          element={<Customers />}
        />

        <Route
          path="/admin/coupons"
          element={<Coupons />}
        />

        <Route
          path="/admin/settings"
          element={<Settings />}
        />

      </Route>


      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route element={<MainLayout />}>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* All Products */}
        <Route
          path="/shop"
          element={<Shop />}
        />

        {/* Products By Category */}
        <Route
          path="/shop/category/:slug"
          element={<Shop />}
        />

        {/* Product Details */}
        <Route
          path="/product/:slug"
          element={<ProductDetails />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Verify OTP */}
        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

      </Route>


      {/* =====================================================
          GUEST ROUTES
      ===================================================== */}

      <Route element={<GuestRoute />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Route>


      {/* =====================================================
          PROTECTED ROUTES
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          {/* Cart */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Wishlist */}
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* Orders */}
          <Route
            path="/orders"
            element={<MyOrders />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Order Success */}
          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

        </Route>

      </Route>


      {/* =====================================================
          404 - PAGE NOT FOUND
      ===================================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;