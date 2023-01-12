import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabase";
import Logo from "../components/Logo";

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
    <div className="container" style={{ maxWidth: 500 }}>
      <Logo />
      <form onSubmit={unuttum}>
        <div className="mb-2">
          <input
            className="form-control form-control-lg"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Email Adresiniz"
          ></input>
        </div>
        <button
          className="btn btn-dark btn-lg w-100 mb-5"
          onClick={unuttum}
          style={{ marginBottom: "10px" }}
        >
          {yukleniyor ? "Yükleniyor" : "Gönder"}
        </button>
        <Link to="/">
          <center>Vazgeç, Giriş Yap!</center>
        </Link>
      </form>
    </div>
  );
};

export default Giris;
