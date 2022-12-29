const Giris = () => {
  const girisYap = (e) => {
    e.preventDefault();
  };

  return (
    <div id="form">
      <div className="logo">ayna</div>
      <form onSubmit={girisYap}>
        <label>Email Adresiniz</label>
        <input type="text" placeholder="Email Adresiniz"></input>
        <label>Şifreniz</label>
        <input type="password" placeholder="Şifreniz"></input>
        <button onClick={girisYap}>Giriş</button>
        <button type="submit">Kaydol</button>
      </form>
    </div>
  );
};

export default Giris;
