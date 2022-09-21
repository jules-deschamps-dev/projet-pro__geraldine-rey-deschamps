import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Lost from "../../pages/Lost";
import Product from "../../pages/Product";
import Login from "../../pages/Login";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/*" element={<Product />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="*" element={<Lost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
