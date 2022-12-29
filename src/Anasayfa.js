import { useEffect } from "react";
import { useSessionKontrol } from "./config/hooks";
import "./Stil.css";
import HavaDurumu from "./moduller/HavaDurumu";
import { useNavigate } from "react-router";

const Anasayfa = () => {
  const session = useSessionKontrol();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) navigate("/giris");
  }, [session]);

  return (
    <div id="app">
      <div className="modul">
        <HavaDurumu />
      </div>
      <div className="modul"></div>
      <div className="modul"></div>
      <div className="modul"></div>
    </div>
  );
};

export default Anasayfa;
