import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./config/supabase";

const Kaydol = () => {
  const [email, setEmail] = useState(null);
  const [isim, setIsim] = useState(null);
  const [telefon, setTelefon] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordTekrar, setPasswordTekrar] = useState(null);
  const [token, setToken] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  const kaydol = (e) => {
    e.preventDefault();
    try {
      setYukleniyor(true);
      const { error } = supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            isim: isim,
            telefon: telefon,
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.log(error.error_description || error.message);
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
      {hata !== null ? (
        <div id="popup">
          <button
            onClick={() => {
              setHata(null);
            }}
            className="btn-kapat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h1>Hata!</h1>
          <p>{hata}</p>
        </div>
      ) : (
        ""
      )}
      <form onSubmit={kaydol}>
        <input
          onChange={(e) => {
            setIsim(e.target.value);
          }}
          type="text"
          placeholder="İsminiz"
          maxLength={50}
        ></input>
        <input
          onChange={(e) => {
            setTelefon(e.target.value);
          }}
          type="text"
          placeholder="Telefon Numaranız"
          maxLength={50}
        ></input>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email Adresiniz"
          maxLength={50}
        ></input>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Şifreniz"
        ></input>
        <input
          onChange={(e) => {
            setPasswordTekrar(e.target.value);
          }}
          type="password"
          placeholder="Şifreniz Tekrar"
        ></input>
        <input
          onChange={(e) => {
            setToken(e.target.value);
          }}
          type="text"
          placeholder="Token"
        ></input>
        <button onClick={kaydol} style={{ marginBottom: "10px" }}>
          {yukleniyor ? "Yükleniyor" : "Kaydol"}
        </button>
        <Link to="/" style={{ marginTop: 20 }}>
          <center>Hesabın var mı? Giriş Yap!</center>
        </Link>
      </form>
    </div>
  );
};

export default Kaydol;
