import "./Stil.css";
import { supabase } from "./config/supabase";
import { Navigate } from "react-router-dom";
import HavaDurumu from "./moduller/HavaDurumu";
import Notlar from "./moduller/Notlar";
import Haberler from "./moduller/Haberler";

const Anasayfa = () => {
  const cikis = async () => {
    await supabase.auth.signOut();
    await (<Navigate to={"/giris"} />);
  };

  return (
    <div id="app">
      <div className="modul">
        <HavaDurumu />
      </div>
      <div className="modul">
        <Notlar />
      </div>
      <div className="modul">
        <Haberler />
      </div>
      <div className="modul"></div>
    </div>
  );
};

export default Anasayfa;
