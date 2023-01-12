import axios from "axios";
import { useEffect, useState } from "react";

const DovizDurumu = () => {
  const [doviz, setDoviz] = useState([
    { birim: "USD", fiyat: "18.73", simge: "₺" },
    { birim: "EUR", fiyat: "20.05", simge: "₺" },
    { birim: "ALTIN", fiyat: "1098", simge: "₺" },
    { birim: "BTC", fiyat: "16.72", simge: "$" },
  ]);

  const dovizComp = (doviz) => {
    return (
      <div className="text-center" key={doviz.birim}>
        <h2>{doviz.birim}</h2>
        <h1>{Number(doviz.fiyat).toFixed(2)}</h1>
        <h3>{doviz.simge}</h3>
      </div>
    );
  };

  return (
    <div className="d-flex flex-row justify-content-between w-100">
      {doviz.map((doviz) => dovizComp(doviz))}
    </div>
  );
};

export default DovizDurumu;
