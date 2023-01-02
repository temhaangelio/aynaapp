import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import axios from "axios";

const Haberler = () => {
  const [haberler, setHaberler] = useState([]);
  useEffect(() => {
    haberGetir();
  }, []);

  const haberGetir = async () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=tr&apiKey=" +
          process.env.REACT_APP_HABER
      )
      .then((res) => {
        setHaberler(res);
      });
  };

  const haberComp = (haber) => {
    return <li key={haber.publishedAt}>{haber.title}</li>;
  };

  return (
    <div id="notlar">
      <ul>{haberler.map((haber) => haberComp(haber))}</ul>
    </div>
  );
};

export default Haberler;
