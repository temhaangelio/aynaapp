import { useState } from "react";
import {
  AiFillEuroCircle,
  AiFillDollarCircle,
  AiFillGold,
} from "react-icons/ai";
import { FaBtc } from "react-icons/fa";

const DovizDurumu = () => {
  const [doviz] = useState([
    {
      birim: "USD",
      fiyat: "18.73",
      simge: <AiFillDollarCircle />,
    },
    { birim: "EUR", fiyat: "20.05", simge: <AiFillEuroCircle /> },
    { birim: "ALTIN", fiyat: "1098", simge: <AiFillGold /> },
    { birim: "BTC", fiyat: "16.72", simge: <FaBtc /> },
  ]);

  const dovizComp = (doviz) => {
    return (
      <div
        className="text-center"
        style={{ marginRight: 50 }}
        key={doviz.birim}
      >
        <h3 style={{ fontSize: "2em" }}>{doviz.simge}</h3>
        <h2>{doviz.birim}</h2>
        <h1>{Number(doviz.fiyat).toFixed(2)}</h1>
      </div>
    );
  };

  return (
    <div className="d-flex flex-row justify-content-center w-100">
      {doviz.map((doviz) => dovizComp(doviz))}
    </div>
  );
};

export default DovizDurumu;
