import { useEffect, useState } from "react";
import axios from "axios";

const Haberler = () => {
  const [haberler, setHaberler] = useState([]);
  const [random, setRandom] = useState(0);

  useEffect(() => {
    haberGetir();
  }, []);

  const haberGetir = async () => {
    await axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=tr&apiKey=" +
          process.env.REACT_APP_HABER
      )
      .then((res) => {
        setHaberler(res.data.articles);
      });
  };

  useEffect(() => {
    setInterval(() => {
      setRandom(Math.floor(Math.random() * 10));
    }, 10000);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center w-100">
      <p className="text-center" style={{ fontSize: "2em", lineHeight: 1.3 }}>
        {haberler[random]?.title}
      </p>
    </div>
  );
};

export default Haberler;
