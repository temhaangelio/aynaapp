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
      <li className="birim" key={doviz.birim}>
        <h2>{doviz.birim}</h2>
        <h1>{Number(doviz.fiyat).toFixed(2)}</h1>
        <h3>{doviz.simge}</h3>
      </li>
    );
  };

  return <ul id="doviz">{doviz.map((doviz) => dovizComp(doviz))}</ul>;
};

export default DovizDurumu;
