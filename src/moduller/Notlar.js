import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const Notlar = ({ user }) => {
  const [notlar, setNotlar] = useState([]);
  const [yeniNot, setYeniNot] = useState("");
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
        key={not.id}
        className="list-group-item d-flex align-items-center py-3"
        style={{ cursor: "pointer" }}>
        <span className="material-symbols-outlined" style={{ marginRight: 15 }}>
          event_note
        </span>
        <span>{not.not}</span>
      </li>
    );
  };

  return (
    <div className="w-100">
      {yeniPopup ? (
        <div className="popup">
          <div className="mb-3">
            <button
              onClick={() => {
                setYeniPopup(false);
              }}
              className="btn btn-link float-end">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div>
            <textarea
              onChange={(e) => {
                setYeniNot(e.target.value);
              }}
              placeholder="Notu buraya ekleyiniz!"
              rows={3}
              className="form-control"
              maxLength={50}></textarea>
            <small className="float-end">{yeniNot.length}/50</small>
          </div>
          <button
            onClick={() => notEkle()}
            className="btn btn-dark btn-lg mt-3">
            {yukleniyor ? (
              <div class="spinner-border spinner-border-sm" role="status"></div>
            ) : (
              "Ekle"
            )}
          </button>
        </div>
      ) : (
        ""
      )}

      {gosterPopup ? (
        <div className="popup">
          <div className="mb-3">
            <button
              className="btn btn-dark"
              onClick={() => {
                notSil();
              }}>
              {yukleniyor ? (
                <div
                  class="spinner-border spinner-border-sm"
                  role="status"></div>
              ) : (
                <span className="material-symbols-outlined d-flex">delete</span>
              )}
            </button>
            <button
              onClick={() => {
                setGosterPopup(false);
                setGuncellenecekNot({ id: null, not: null });
              }}
              className="btn btn-link float-end">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="mb-3">
            <textarea
              onChange={(e) => {
                setGuncellenecekNot({
                  id: guncellecekNot.id,
                  not: e.target.value,
                });
              }}
              value={guncellecekNot.not}
              placeholder="Notu buraya ekleyiniz!"
              rows={3}
              maxLength="50"
              className="form-control form-control-lg"></textarea>
            <span className="float-end">{guncellecekNot.not.length}/50</span>
          </div>
          <button onClick={() => notGuncelle()} className="btn btn-dark btn-lg">
            {yukleniyor ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"></div>
            ) : (
              "Güncelle"
            )}
          </button>
        </div>
      ) : (
        ""
      )}

      <ul className="list-group list-group-flush">
        {notlar.length > 0 ? (
          notlar.map((not) => notComp(not))
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span className="material-symbols-outlined display-1">
              event_note
            </span>
            <span className="my-5">Eklenmiş bir notunuz bulunmamaktadır.</span>
            <button
              onClick={() => {
                setYeniPopup(true);
              }}
              className="btn btn-dark btn-lg">
              Not Ekle
            </button>
          </div>
        )}
      </ul>
      {notlar.length > 0 && notlar.length < 5 ? (
        <button
          onClick={() => {
            setYeniPopup(true);
          }}
          className="d-flex p-3 btn btn-dark btn-lg float-end position-absolute bottom-0 end-0 m-3">
          <span className="material-symbols-outlined">add</span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notlar;
