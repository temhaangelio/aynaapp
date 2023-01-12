import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./config/supabase";

const Giris = () => {
  const [email, setEmail] = useState("temhaangelio@yandex.com");
  const [password, setPassword] = useState("123456");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [uyari, setUyari] = useState(null);

  const girisYap = async (e) => {
    e.preventDefault();
    try {
      await setYukleniyor(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      switch (error.message) {
        case "Email not confirmed":
          setUyari("Email adresinizi onaylamanız gerekmektedir!");
          break;
        case "Invalid login credentials":
          setUyari("Hatalı email veya şifre!");
          break;
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
      <form onSubmit={girisYap}>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email Adresiniz"></input>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Şifreniz"></input>
        <button onClick={girisYap} style={{ marginBottom: "10px" }}>
          {yukleniyor ? "Yükleniyor" : "Gönder"}
        </button>
        <Link to="/kaydol" style={{ marginTop: 20 }}>
          <center>Hesabın yok mu? Kaydol!</center>
        </Link>
        <Link to="/unuttum" style={{ marginTop: 20 }}>
          <center>Şifremi Unuttum?</center>
        </Link>
      </form>
    </div>
  );
};

export default Giris;
