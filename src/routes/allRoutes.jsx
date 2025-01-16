import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login/login.jsx";
import SignupPage from "../pages/signUp/signUp.jsx";
import ForgotPasswordPage from "../pages/forgetPassword/forgetPassword.jsx";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import ShoppingCart from "../pages/shoppingcart/shoppingcart.jsx";
import UpdatePasswordPage from "../pages/passwordUpdated/passwordUpdated.jsx";
import { CartProvider } from "../context/cartContext.js";

const AllRoutes = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/forgetpassword" element={<ForgotPasswordPage />}></Route>
        <Route path="/cart" element={<ShoppingCart />}></Route>
        <Route
          path="/updatepassword/:token"
          element={<UpdatePasswordPage />}
        ></Route>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
    </CartProvider>
  );
};

export default AllRoutes;
