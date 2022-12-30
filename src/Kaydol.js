import { useState } from "react";
import { supabase } from "./config/supabase";

const Kaydol = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordTekrar, setPasswordTekrar] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  const girisYap = (e) => {
    e.preventDefault();
    try {
      setYukleniyor(true);
      const { error } = supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div id="form">
      <div className="logo">ayna</div>
      <form onSubmit={girisYap}>
        <label>Email Adresiniz</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email Adresiniz"></input>
        <label>Şifreniz</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Şifreniz"></input>
        <label>Şifreniz Tekrar</label>
        <input
          onChange={(e) => {
            setPasswordTekrar(e.target.value);
          }}
          type="password"
          placeholder="Şifreniz"></input>
        <button onClick={girisYap}>Giriş</button>
        {yukleniyor ? "Yükleniyor" : <button type="submit">Kaydol</button>}
      </form>
    </div>
  );
};

export default Kaydol;
