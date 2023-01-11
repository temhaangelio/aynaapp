import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const Notlar = ({ user }) => {
  const [notlar, setNotlar] = useState([]);
  const [yeniNot, setYeniNot] = useState(null);
  const [guncellecekNot, setGuncellenecekNot] = useState({
    id: null,
    not: null,
  });
  const [yeniPopup, setYeniPopup] = useState(false);
  const [gosterPopup, setGosterPopup] = useState(false);

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
    setYeniPopup(false);
  };

  const notSil = async () => {
    const { data, error } = await supabase
      .from("notlar")
      .delete()
      .eq("id", guncellecekNot.id);
    setGosterPopup(false);
  };

  const notComp = (not) => {
    return (
      <li
        onClick={() => {
          setGosterPopup(true);
          setGuncellenecekNot({
            id: not.id,
            not: not.not,
          });
        }}
        key={not.id}
      >
        {not.not}
      </li>
    );
  };

  return (
    <div id="notlar">
      {yeniPopup ? (
        <div id="popup">
          <h1>Yeni Not</h1>
          <button
            onClick={() => {
              setYeniPopup(false);
            }}
            className="btn-kapat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <textarea
            onChange={(e) => {
              setYeniNot(e.target.value);
            }}
            placeholder="Notu buraya ekleyiniz!"
            rows={5}
          ></textarea>

          <button onClick={() => notEkle()} className="btn-ekle">
            Ekle
          </button>
        </div>
      ) : (
        ""
      )}

      {gosterPopup ? (
        <div id="popup">
          <button
            onClick={() => {
              setGosterPopup(false);
              setGuncellenecekNot({ id: null, not: null });
            }}
            className="btn-kapat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <button
            className="btn-link"
            onClick={() => {
              notSil();
            }}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
          <textarea
            onChange={(e) => {
              setYeniNot(e.target.value);
            }}
            value={guncellecekNot.not}
            placeholder="Notu buraya ekleyiniz!"
            rows={5}
          ></textarea>

          <button onClick={() => notEkle()} className="btn-ekle">
            Güncelle
          </button>
        </div>
      ) : (
        ""
      )}

      <ul>
        {notlar.length > 0 ? (
          notlar.map((not) => notComp(not))
        ) : (
          <div className="bos">
            <span className="material-symbols-outlined">event_note</span>
            <span>Eklenmiş bir notunuz bulunmamaktadır.</span>
            <button
              onClick={() => {
                setYeniPopup(true);
              }}
              className="buton"
            >
              Yeni Not Ekle
            </button>
          </div>
        )}
      </ul>
      {notlar.length > 0 && notlar.length < 6 ? (
        <button
          onClick={() => {
            setYeniPopup(true);
          }}
          className="yeni"
        >
          +
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notlar;
