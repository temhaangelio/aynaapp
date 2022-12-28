const Giris = () => {
  return (
    <div id="form">
      <div className="logo">ayna</div>
      <form>
        <label>Email Adresiniz</label>
        <input type="text" placeholder="Email Adresiniz"></input>
        <label>Şifreniz</label>
        <input type="password" placeholder="Şifreniz"></input>
        <button>Giriş</button>
        <button>Kaydol</button>
      </form>
    </div>
  );
};

export default Giris;
