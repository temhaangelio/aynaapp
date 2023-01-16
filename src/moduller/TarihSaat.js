import { useEffect, useState } from "react";

const TarihSaat = () => {
  const [saat, setSaat] = useState(null);
  const [tarih, setTarih] = useState(null);
  useEffect(() => {
    saatGoster();
    tarihGoster();
  });

  const saatGoster = () => {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59

    if (h == 0) {
      h = 24;
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " ";
    setSaat(time);
    setTimeout(saatGoster, 1000);
  };

  const tarihGoster = () => {
    let simdi = new Date().toLocaleDateString("tr-tr", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    setTarih(simdi);
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
      <h1 style={{ fontSize: "7em" }}>{saat}</h1>
      <span style={{ fontSize: "3em" }}>{tarih}</span>
    </div>
  );
};

export default TarihSaat;
