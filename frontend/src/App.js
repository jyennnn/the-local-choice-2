import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Pages/Home";
import NavBar from "./Components/NavBar";
import FooterContent from "./Components/FooterContent";
import Admin from "./Pages/Admin";
import Error from "./Pages/Error";
import Store from "./Pages/Store";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import NewStore from "./Pages/NewStore";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";

import EditForm from "./Pages/EditForm";
import AllStores from "./Pages/AllStores";
// Shopping cart pages
import SCCancel from "./Pages/SCCancel";
import SCSuccess from "./Pages/SCSuccess";
import CartProvider from "./CardContext";

import AddProducts from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import OrderDetail from "./Pages/OrderDetail";
import Checkout from "./Pages/Checkout";
import PlaceOrderCheckout from "./Pages/PlaceOrderCheckout";
import AdminOrderStatus from "./Pages/AdminOrder";

import responsiveMainTheme from "./design/themes";
import { ThemeProvider } from "@mui/material/styles";

import About from "./Pages/About";
import Contact from "./Pages/Contact";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <ThemeProvider theme={responsiveMainTheme}>
      <CartProvider>
        <div className="App" style={{ backgroundColor: "#E4DCCD" }}>
          <Router>
            <NavBar />
            <Routes>
              {/* public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* user + admin routes */}
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Error />} />
              <Route path="/stores" element={<AllStores />} />
              <Route path="/stores/:id" element={<Store />} />
              <Route
                path="/stores/:id/:productId"
                element={<ProductDetail />}
              />
              <Route path="/products" element={<Products />} />
              {/* user routes mainly */}
              <Route path="/sccancel" element={<SCCancel />} />
              <Route path="/scsuccess/:session_id" element={<SCSuccess />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/:id" element={<PlaceOrderCheckout />} />
              <Route path="/profile" element={<Profile />} />
              {/* admin routes */}
              <Route path="/config/stores" element={<Admin />} />
              <Route path="/config/stores/new" element={<NewStore />} />
              <Route path="/config/stores/:id" element={<EditForm />} />
              <Route
                path="/config/stores/:id/products"
                element={<AddProducts />}
              />
              <Route
                path="/config/stores/:id/products/:productId"
                element={<EditProduct />}
              />
              <Route
                path="/config/stores/orders"
                element={<AdminOrderStatus />}
              />
            </Routes>
            {/* <FooterContent /> */}
          </Router>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
