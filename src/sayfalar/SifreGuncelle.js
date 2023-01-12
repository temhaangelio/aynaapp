import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabase";

const SifreGuncelle = () => {
  const [sifre, setSifre] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [uyari, setUyari] = useState(null);

  const guncelle = async (e) => {
    e.preventDefault();
    try {
      await setYukleniyor(true);
      const { data, error } = await supabase.auth.updateUser({
        password: sifre,
      });
      if (error) {
        throw error;
      } else {
        <Navigate replace to="/" />;
      }
    } catch (error) {
      setUyari(error.message);
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div id="form">
      <div id="logo">
        <div className="cerceve"></div>
        <span>aynaayna</span>
      </div>
      {uyari ? (
        <div id="popup">
          <button
            onClick={() => {
              setUyari(null);
            }}
            className="btn-kapat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h1>Uyarı!</h1>
          <p>{uyari}</p>
        </div>
      ) : (
        ""
      )}
      <form onSubmit={guncelle}>
        <input
          onChange={(e) => {
            setSifre(e.target.value);
          }}
          type="text"
          placeholder="Şifreniz"
        ></input>
        <button onClick={guncelle} style={{ marginBottom: "10px" }}>
          {yukleniyor ? "Yükleniyor" : "Gönder"}
        </button>
      </form>
    </div>
  );
};

export default SifreGuncelle;
