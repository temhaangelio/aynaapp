import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./config/supabase";

const Giris = () => {
  const [email, setEmail] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [uyari, setUyari] = useState(null);

  const unuttum = async (e) => {
    e.preventDefault();
    try {
      await setYukleniyor(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/sifreguncelle",
      });
      if (error) {
        throw error;
      } else {
        setUyari("Lütfen email adresinizi kontrol ediniz!");
      }
    } catch (error) {
      switch (error.message) {
        default:
          setUyari(error.message);
          break;
      }
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
            className="btn-kapat">
            <span className="material-symbols-outlined">close</span>
          </button>
          <h1>Uyarı!</h1>
          <p>{uyari}</p>
        </div>
      ) : (
        ""
      )}
      <form onSubmit={unuttum}>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email Adresiniz"></input>
        <button onClick={unuttum} style={{ marginBottom: "10px" }}>
          {yukleniyor ? "Yükleniyor" : "Gönder"}
        </button>
        <Link to="/" style={{ marginTop: 20 }}>
          <center>Giriş Yap!</center>
        </Link>
      </form>
    </div>
  );
};

export default Giris;
