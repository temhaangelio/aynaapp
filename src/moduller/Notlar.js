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
  const [yukleniyor, setYukleniyor] = useState(false);

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
            case "UPDATE":
              setNotlar((notes) =>
                notes.filter((not) => not.id !== payload.old.id)
              );
              setNotlar((notes) => [payload.new, ...notes]);
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
    await setYukleniyor(true);
    const { data, error } = await supabase
      .from("notlar")
      .insert([{ not: yeniNot, user_id: user.id }]);
    setYeniPopup(false);
    await setYukleniyor(false);
  };

  const notSil = async () => {
    const { data, error } = await supabase
      .from("notlar")
      .delete()
      .eq("id", guncellecekNot.id);
    setGosterPopup(false);
  };

  const notGuncelle = async () => {
    const { data, error } = await supabase
      .from("notlar")
      .update({ not: guncellecekNot.not })
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
        key={not.id}>
        <span class="material-symbols-outlined" style={{ marginRight: 15 }}>
          event_note
        </span>
        <span>{not.not}</span>
      </li>
    );
  };

  return (
    <div id="notlar">
      {yeniPopup ? (
        <div id="popup">
          <button
            onClick={() => {
              setYeniPopup(false);
            }}
            className="btn-kapat">
            <span className="material-symbols-outlined">close</span>
          </button>
          <textarea
            style={{ marginTop: 60 }}
            onChange={(e) => {
              setYeniNot(e.target.value);
            }}
            placeholder="Notu buraya ekleyiniz!"
            rows={5}></textarea>

          <button onClick={() => notEkle()} className="btn-ekle">
            {yukleniyor ? "Ekleniyor" : "Ekle"}
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
            className="btn-kapat">
            <span className="material-symbols-outlined">close</span>
          </button>
          <button
            className="btn-link"
            onClick={() => {
              notSil();
            }}>
            <span className="material-symbols-outlined">delete</span>
          </button>
          <textarea
            onChange={(e) => {
              setGuncellenecekNot({
                id: guncellecekNot.id,
                not: e.target.value,
              });
            }}
            value={guncellecekNot.not}
            placeholder="Notu buraya ekleyiniz!"
            rows={5}
            maxLength="50"></textarea>
          <span style={{ alignSelf: "flex-end", marginTop: 10 }}>
            {guncellecekNot.not.length}/100
          </span>
          <button onClick={() => notGuncelle()} className="btn-ekle">
            {yukleniyor ? "Güncelleniyor" : "Güncelle"}
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
              className="buton">
              Yeni Not Ekle
            </button>
          </div>
        )}
      </ul>
      {notlar.length > 0 && notlar.length < 5 ? (
        <button
          onClick={() => {
            setYeniPopup(true);
          }}
          className="yeni">
          +
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notlar;
