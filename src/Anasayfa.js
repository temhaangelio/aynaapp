import "./Stil.css";
import HavaDurumu from "./moduller/HavaDurumu";

const Anasayfa = () => {
  return (
    <div id="app">
      <div className="modul">
        <HavaDurumu />
      </div>
      <div className="modul"></div>
      <div className="modul"></div>
      <div className="modul"></div>
    </div>
  );
};

export default Anasayfa;
