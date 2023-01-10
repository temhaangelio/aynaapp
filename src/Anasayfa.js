import "./Stil.css";
import { useNavigate } from "react-router-dom";
import HavaDurumu from "./moduller/HavaDurumu";
import Notlar from "./moduller/Notlar";
import Haberler from "./moduller/Haberler";
import Doviz from "./moduller/Doviz";
import { supabase } from "./config/supabase";

const stil = {
  profilButon: {
    position: "absolute",
    backgroundColor: "#000",
    color: "#fff",
    right: 20,
    top: 20,
  },
};

const Anasayfa = () => {
  const navitage = useNavigate();
  return (
    <div id="app">
      <button
        onClick={() => {
          supabase.auth.signOut();
        }}
        className={stil}
      >
        profil
      </button>
      <div className="modul">
        <HavaDurumu />
      </div>
      <div className="modul">
        <Notlar />
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
