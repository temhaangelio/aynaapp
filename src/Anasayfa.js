import "./Stil.css";
import { supabase } from "./config/supabase";
import { Navigate } from "react-router-dom";
import HavaDurumu from "./moduller/HavaDurumu";
import Notlar from "./moduller/Notlar";
import Haberler from "./moduller/Haberler";
import Doviz from "./moduller/Doviz";

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
  const cikis = async () => {
    await supabase.auth.signOut();
    await (<Navigate to={"/giris"} />);
  };

  return (
    <div id="app">
      <button
        onClick={() => {
          cikis();
        }}
        style={stil.profilButon}>
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
