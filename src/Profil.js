import { useNavigate } from "react-router-dom";
import { supabase } from "./config/supabase";
import "./Stil.css";

const Profil = () => {
  const navigate = useNavigate();

  return (
    <div id="app">
      <button
        onClick={() => {
          supabase.auth.signOut();
          navigate("/");
        }}>
        çıkış
      </button>
    </div>
  );
};

export default Profil;
