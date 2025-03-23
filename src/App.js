import React from "react";

//React Router
import { Route, Routes } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Cart from "./pages/cart/ShopCart";
import ProductDetail from "./pages/products/ProductDetail";

//Components
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/footer";
import NotFound from "./pages/NotFound";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";

const App = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/sepet" element={<Cart />}></Route>
            <Route path="/urun-detay/:id" element={<ProductDetail />}></Route>
            <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
