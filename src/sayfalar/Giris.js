import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabase";
import Logo from "../components/Logo";
import { useAlert } from "react-alert";

const Giris = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [uyari, setUyari] = useState(null);
  const alert = useAlert();

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
          alert.error("Hatalı kullanıcı adı şifre!");
          break;
        default:
          alert.error(error.message);
          break;
      }
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <Logo />
      <form onSubmit={girisYap}>
        <div className="mb-2">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Email Adresiniz"
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
        <button
          className="btn btn-dark btn-lg w-100 mt-3"
          onClick={girisYap}
          style={{ marginBottom: "10px" }}
        >
          {yukleniyor ? "Yükleniyor" : "Gönder"}
        </button>
        <div className="mt-5">
          <Link to="/kaydol">
            <center>Hesabın yok mu? Kaydol!</center>
          </Link>
          <Link to="/unuttum">
            <center>Şifremi Unuttum?</center>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Giris;
