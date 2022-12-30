import { useState } from "react";
import { supabase } from "./config/supabase";

const Giris = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  const girisYap = async (e) => {
    e.preventDefault();
    try {
      await setYukleniyor(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data);
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
        {email}
        <label>Email Adresiniz</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email Adresiniz"></input>
        <label>Şifreniz</label>
        {password}
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Şifreniz"></input>
        <button onClick={girisYap} style={{ marginBottom: "10px" }}>
          Giriş
        </button>
        {yukleniyor ? "Yükleniyor" : <button type="submit">Kaydol</button>}
      </form>
    </div>
  );
};

export default Giris;
