import HavaDurumu from "../moduller/HavaDurumu";
import Notlar from "../moduller/Notlar";
import Haberler from "../moduller/Haberler";
import Doviz from "../moduller/Doviz";
import TarihSaat from "../moduller/TarihSaat";
import { supabase } from "../config/supabase";
import { useEffect, useState } from "react";

const Anasayfa = ({ user }) => {
  const [profilPopup, setProfilPopup] = useState(false);
  const [ayarPopup, setAyarPopup] = useState(false);
  const [profilGuncelle, setProfilGuncelle] = useState(false);
  const [isim, setIsim] = useState(null);
  const [email, setEmail] = useState(null);
  const [telefon, setTelefon] = useState(null);

  useEffect(() => {
    setIsim(user.user_metadata.isim);
    setEmail(user.email);
    setTelefon(user.user_metadata.telefon);
  });

  return (
    <div className="container-fluid position-relative">
      <div className="position-absolute top-0 end-0 d-flex p-3">
        <button
          onClick={() => {
            setAyarPopup(true);
          }}
          className="btn btn-dark btn-lg p-2 d-flex"
          style={{ zIndex: 1001, marginRight: 10 }}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button
          onClick={() => {
            setProfilPopup(true);
          }}
          className="btn btn-dark btn-lg p-2 d-flex"
          style={{ zIndex: 1001 }}
        >
          <span className="material-symbols-outlined">face</span>
        </button>
      </div>

      {profilPopup ? (
        <div className="popup">
          <div className="mb-3">
            {!profilGuncelle ? (
              <button
                onClick={() => {
                  setProfilGuncelle(true);
                }}
                className="btn btn-link float-start"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            ) : (
              ""
            )}
            <button
              onClick={() => {
                setProfilPopup(false);
              }}
              className="btn btn-link float-end"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "5em" }}
              >
                face
              </span>
              {profilGuncelle ? (
                <div>
                  <input
                    type="text"
                    className="form-control form-control-lg mb-2"
                    onChange={(e) => {
                      setIsim(e.target.value);
                    }}
                    value={isim}
                  />
                  <input
                    type="text"
                    className="form-control form-control-lg mb-2"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                  <input
                    type="text"
                    className="form-control form-control-lg mb-2"
                    onChange={(e) => {
                      setTelefon(e.target.value);
                    }}
                    value={telefon}
                  />
                  <div className="row mt-5">
                    <div className="col-md-6 col-sm-12">
                      <button
                        className="btn btn-dark btn-lg w-100"
                        onClick={() => {
                          setProfilGuncelle(false);
                        }}
                      >
                        Vazgeç
                      </button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <button className="btn btn-dark btn-lg w-100">
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="pb-3">{isim}</h3>
                  <div
                    className="mb-5 pt-3"
                    style={{ borderTop: "1px solid #333" }}
                  >
                    {email} <br></br> {telefon}
                  </div>
                </div>
              )}
            </div>
          </div>
          {!profilGuncelle ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="btn btn-dark btn-lg mt-3"
            >
              Çıkış Yap!
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {ayarPopup ? (
        <div className="popup">
          <div className="mb-3">
            <button
              onClick={() => {
                setAyarPopup(false);
              }}
              className="btn btn-link float-end"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div>
            <h4>Modüller</h4>
            <ul className="list-group">
              <li className="list-group-item py-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="birCheckbox"
                  style={{ marginRight: "15px" }}
                />
                <label className="form-check-label" for="birCheckbox">
                  Saat
                </label>
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="ikiCheckbox"
                  style={{ marginRight: "15px" }}
                />
                <label
                  className="form-check-label"
                  style={{ marginRight: 20 }}
                  for="ikiCheckbox"
                >
                  Notlar
                </label>
              </li>
              <li className="list-group-item d-flex flex-row justify-content-between">
                <div>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="ucCheckbox"
                    style={{ marginRight: "15px" }}
                  />
                  <label className="form-check-label" for="ucCheckbox">
                    Hava Durumu
                  </label>
                </div>
                <select
                  style={{
                    fontSize: "0.7em",
                    backgroundColor: "#000",
                    color: "#666",
                    padding: "5px 10px",
                    borderRadius: 10,
                  }}
                >
                  <option>Bursa</option>
                </select>
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="dortCheckbox"
                  style={{ marginRight: "15px" }}
                />
                <label className="form-check-label" for="dortCheckbox">
                  Haberler
                </label>
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="besCheckbox"
                  style={{ marginRight: "15px" }}
                />
                <label className="form-check-label" for="besCheckbox">
                  Döviz Kurları
                </label>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="row">
        <div
          className="col-md-6 col-sm-12 p-5 d-flex justify-content-center align-items-center"
          style={{
            height: "50vh",
            border: "1px solid #333",
          }}
        >
          <TarihSaat />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex align-items-center"
          style={{
            height: "50vh",
            border: "1px solid #333",
          }}
        >
          <Notlar user={user} />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex align-items-center position-relative"
          style={{
            height: "50vh",
            border: "1px solid #333",
          }}
        >
          <HavaDurumu />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex  align-items-center"
          style={{ height: "50vh", border: "1px solid #333" }}
        >
          <div className="d-flex flex-column w-100">
            <div style={{ marginBottom: "150px" }}>
              <Doviz />
            </div>
            <Haberler />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anasayfa;
