import "./Stil.css";
import { useNavigate } from "react-router-dom";
import HavaDurumu from "./moduller/HavaDurumu";
import Notlar from "./moduller/Notlar";
import Haberler from "./moduller/Haberler";
import Doviz from "./moduller/Doviz";
import { supabase } from "./config/supabase";

const Anasayfa = ({ user }) => {
  const navitage = useNavigate();
  return (
    <div id="app">
      <button
        style={{
          position: "absolute",
          right: 0,
          right: 30,
          top: 30,
          padding: 10,
          backgroundColor: "#333",
          color: "#fff",
          borderRadius: 10,
          fontSize: 20,
          cursor: "pointer",
        }}
      >
        <span className="material-symbols-outlined">settings</span>
      </button>
      <div className="modul">
        <HavaDurumu />
      </div>
      <div className="modul">
        <Notlar user={user} />
      </div>
      <div className="modul">
        <Haberler />
      </div>
      <div className="modul">
        <Doviz />
      </div>
    </div>
  );
};

export default Anasayfa;
