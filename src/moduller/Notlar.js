import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const Notlar = ({ user }) => {
  const [notlar, setNotlar] = useState([]);
  const [yeniNot, setYeniNot] = useState(null);
  const [popup, setPopup] = useState(false);

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
              setNotlar((notes) => [payload.new, ...notes]);
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
    let { data } = await supabase
      .from("notlar")
      .select("*")
      .order("zaman", { ascending: false });
    await setNotlar(data);
  };

  const notEkle = async () => {
    const { data, error } = await supabase
      .from("notlar")
      .insert([{ not: yeniNot, user_id: user.id }]);
    setPopup(false);
  };

  const notComp = (not) => {
    return <li key={not.id}>{not.not}</li>;
  };

  return (
    <div id="notlar">
      {popup ? (
        <div id="popup">
          <h1>Yeni Not</h1>
          <button
            onClick={() => {
              setPopup(false);
            }}
            className="btn-kapat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <textarea
            onChange={(e) => {
              setYeniNot(e.target.value);
            }}
            rows={5}
          ></textarea>

          <button onClick={() => notEkle()} className="btn-ekle">
            Ekle
          </button>
        </div>
      ) : (
        ""
      )}
      <ul>{notlar.map((not) => notComp(not))}</ul>
      <button
        onClick={() => {
          setPopup(true);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Notlar;
