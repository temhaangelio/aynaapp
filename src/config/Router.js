import { Routes, Route, BrowserRouter } from "react-router-dom";

import AuthLayout from "../layout/AuthLayout";
import Layout from "../layout/Layout";

import Anasayfa from "../Anasayfa";
import Profil from "../Profil";
import Giris from "../Giris";
import Kaydol from "../Kaydol";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Anasayfa />}></Route>
          <Route path="/profil" element={<Profil />}></Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/giris" element={<Giris />}></Route>
          <Route path="/kaydol" element={<Kaydol />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
