import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const Notlar = () => {
  const [notlar, setNotlar] = useState([]);
  useEffect(() => {
    notGetir();
  }, []);

  const notGetir = async () => {
    let { data } = await supabase.from("notlar").select("*");
    await setNotlar(data);
  };

  const notComp = (not) => {
    return <li key={not.id}>{not.not}</li>;
  };

  return (
    <div id="notlar">
      <ul>{notlar.map((not) => notComp(not))}</ul>
    </div>
  );
};

export default Notlar;
