import { BrowserRouter, Routes, Route } from "react-router-dom";
import Anasayfa from "../Anasayfa";
import Giris from "../Giris";
import Kaydol from "../Kaydol";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Anasayfa />}></Route>
        <Route path="/giris" element={<Giris />}></Route>
        <Route path="/kaydol" element={<Kaydol />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
