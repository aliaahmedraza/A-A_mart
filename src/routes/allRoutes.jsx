import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import LoginPage from "../pages/login/login.jsx";
import SignupPage from "../pages/signUp/signUp.jsx";
import ForgotPasswordPage from "../pages/forgetPassword/forgetPassword.jsx";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import ShoppingCart from "../pages/shoppingcart/shoppingcart.jsx";
import UpdatePasswordPage from "../pages/passwordUpdated/passwordUpdated.jsx";
import { CartProvider } from "../context/cartContext.js";

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const AllRoutes = () => {
  const isAuthenticated = Boolean(Cookies.get("token"));

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgetpassword" element={<ForgotPasswordPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/updatepassword/:token" element={<UpdatePasswordPage />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default AllRoutes;
