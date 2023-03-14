import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RegisterPage from "./Register";
import DetailsPage from "./DetailsPage";


export default function RouterConfig() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="details/:id" element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}