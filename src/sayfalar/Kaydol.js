import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import Logo from "../components/Logo";

const Kaydol = () => {
  const [email, setEmail] = useState(null);
  const [isim, setIsim] = useState(null);
  const [telefon, setTelefon] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordTekrar, setPasswordTekrar] = useState(null);
  const [token, setToken] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [uyari, setUyari] = useState(null);

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
      <Navigate replace to="/" />;
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <Logo />
      <form onSubmit={kaydol}>
        <div className="mb-2">
          <input
            onChange={(e) => {
              setIsim(e.target.value);
            }}
            type="text"
            placeholder="İsminiz"
            maxLength={50}
            className="form-control form-control-lg"
          ></input>
        </div>
        <div className="mb-2">
          <input
            onChange={(e) => {
              setTelefon(e.target.value);
            }}
            type="text"
            placeholder="Telefon Numaranız"
            maxLength={50}
            className="form-control form-control-lg"
          ></input>
        </div>
        <div className="mb-2">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Email Adresiniz"
            maxLength={50}
            className="form-control form-control-lg"
          ></input>
        </div>
        <div className="mb-2">
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Şifreniz"
            className="form-control form-control-lg"
          ></input>
        </div>

        <div className="mb-2">
          <input
            onChange={(e) => {
              setPasswordTekrar(e.target.value);
            }}
            type="password"
            placeholder="Şifreniz Tekrar"
            className="form-control form-control-lg"
          ></input>
        </div>
        <div className="mb-2">
          <input
            onChange={(e) => {
              setToken(e.target.value);
            }}
            type="text"
            placeholder="Token"
            className="form-control form-control-lg"
          ></input>
        </div>
        <button
          className="btn btn-dark btn-lg w-100 mt-3 mb-5"
          onClick={kaydol}
        >
          {yukleniyor ? "Yükleniyor" : "Kaydol"}
        </button>
        <Link to="/">
          <center>Hesabın var mı? Giriş Yap!</center>
        </Link>
      </form>
    </div>
  );
};

export default Kaydol;
