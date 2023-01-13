import HavaDurumu from "../moduller/HavaDurumu";
import Notlar from "../moduller/Notlar";
import Haberler from "../moduller/Haberler";
import Doviz from "../moduller/Doviz";
import { supabase } from "../config/supabase";
import { useEffect, useState } from "react";

const Anasayfa = ({ user }) => {
  const [profilPopup, setProfilPopup] = useState(false);
  const [profilGuncelle, setProfilGuncelle] = useState(false);

  return (
    <div className="container-fluid position-relative">
      <div className="position-absolute top-0 end-0 d-flex p-3">
        <button
          onClick={() => {
            setProfilPopup(true);
          }}
          className="btn btn-dark btn-lg p-2 d-flex"
          style={{ zIndex: 1001, marginRight: 10 }}>
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button
          onClick={() => {
            setProfilPopup(true);
          }}
          className="btn btn-dark btn-lg p-2 d-flex"
          style={{ zIndex: 1001 }}>
          <span className="material-symbols-outlined">face</span>
        </button>
      </div>

      {profilPopup ? (
        <div className="popup">
          <div className="mb-3">
            <button
              onClick={() => {
                setProfilPopup(false);
              }}
              className="btn btn-link float-start">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button
              onClick={() => {
                setProfilPopup(false);
              }}
              className="btn btn-link float-end">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "5em" }}>
                face
              </span>
              {profilGuncelle ? (
                <div>
                  <input type="text" className="form-control" />
                  <div
                    className="mb-5 pt-3"
                    style={{ borderTop: "1px solid #333" }}>
                    {user.email} <br></br> {user.user_metadata.telefon}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="pb-3">{user.user_metadata.isim}</h3>
                  <div
                    className="mb-5 pt-3"
                    style={{ borderTop: "1px solid #333" }}>
                    {user.email} <br></br> {user.user_metadata.telefon}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="btn btn-dark btn-lg mt-3">
            Çıkış Yap!
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="row">
        <div
          className="col-md-6 col-sm-12 p-5 d-flex align-items-center"
          style={{
            height: "50vh",
            borderRight: "1px solid #333",
            borderBottom: "1px solid #333",
          }}>
          <HavaDurumu />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex align-items-center position-relative"
          style={{
            height: "50vh",
            borderBottom: "1px solid #333",
          }}>
          <Notlar user={user} />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex align-items-center"
          style={{
            height: "50vh",
            borderRight: "1px solid #333",
          }}>
          <Haberler />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex align-items-center"
          style={{ height: "50vh" }}>
          <Doviz />
        </div>
      </div>
    </div>
  );
};

export default Anasayfa;
