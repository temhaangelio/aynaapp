import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const Notlar = () => {
  const [notlar, setNotlar] = useState([]);

  useEffect(() => {
    supabase
      .channel("any_string_you_want")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notlar",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setNotlar((notes) => [...notes, payload.new]);
              break;
            case "DELETE":
              setNotlar((notes) =>
                notes.filter((not) => not.id !== payload.old.id)
              );
              break;

            default:
              break;
          }
        }
      )
      .subscribe();
  }, []);

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
