import "./Stil.css";
import { useNavigate } from "react-router-dom";
import HavaDurumu from "./moduller/HavaDurumu";
import Notlar from "./moduller/Notlar";
import Haberler from "./moduller/Haberler";
import Doviz from "./moduller/Doviz";
import { supabase } from "./config/supabase";
import { useEffect, useState } from "react";

const Anasayfa = ({ user }) => {
  const [profilPopup, setProfilPopup] = useState(false);
  const [modullerPopup, setModullerPopup] = useState(false);

  return (
    <div id="app">
      <button
        style={{
          position: "absolute",
          right: 0,
          right: 30,
          top: 30,
          padding: 10,
          paddingBottom: "5px",
          backgroundColor: "#333",
          color: "#fff",
          borderRadius: 10,
          fontSize: 20,
          cursor: "pointer",
        }}
        onClick={() => {
          setProfilPopup(true);
        }}>
        <span className="material-symbols-outlined">settings</span>
      </button>
      {profilPopup ? (
        <div id="popup" style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              setProfilPopup(false);
            }}
            className="btn-kapat">
            <span className="material-symbols-outlined">close</span>
          </button>
          <span
            class="material-symbols-outlined"
            style={{ fontSize: 150, marginTop: 30 }}>
            face
          </span>
          <h1>{user.user_metadata.isim}</h1>
          <p>
            <small>
              <br />
              {user.email}
              <br /> {user.user_metadata.telefon}
            </small>
          </p>
          <button
            className="buton"
            onClick={() => {
              setProfilPopup(false);
              setModullerPopup(true);
            }}
            style={{ marginBottom: 10, marginTop: 30 }}>
            Modüller
          </button>
          <button
            className="buton"
            onClick={() => {
              supabase.auth.signOut();
            }}>
            Çıkış Yap
          </button>
        </div>
      ) : (
        ""
      )}

      {modullerPopup ? (
        <div id="popup" style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              setModullerPopup(false);
            }}
            className="btn-kapat">
            <span className="material-symbols-outlined">close</span>
          </button>
          modüller
        </div>
      ) : (
        ""
      )}

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
