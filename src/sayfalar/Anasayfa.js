import HavaDurumu from "../moduller/HavaDurumu";
import Notlar from "../moduller/Notlar";
import Haberler from "../moduller/Haberler";
import Doviz from "../moduller/Doviz";
import { supabase } from "../config/supabase";
import { useState } from "react";

const Anasayfa = ({ user }) => {
  const [profilPopup, setProfilPopup] = useState(false);

  return (
    <div className="container-fluid position-relative">
      <button
        onClick={() => {
          setProfilPopup(true);
        }}
        className="btn btn-dark btn-lg float-end position-absolute top-0 end-0 m-3 d-flex p-3"
        style={{ zIndex: 1001 }}
      >
        <span class="material-symbols-outlined">settings</span>
      </button>

      {profilPopup ? (
        <div className="popup">
          <div className="mb-3">
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
            <div className="col-md-6">dddd</div>
            <div className="col-md-6">ssss</div>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="btn btn-dark btn-lg mt-3"
          >
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
          }}
        >
          <HavaDurumu />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex align-items-center position-relative"
          style={{
            height: "50vh",
            borderBottom: "1px solid #333",
          }}
        >
          <Notlar user={user} />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex align-items-center"
          style={{
            height: "50vh",
            borderRight: "1px solid #333",
          }}
        >
          <Haberler />
        </div>
        <div
          className="col-sm-12 col-md-6 p-5 d-flex align-items-center"
          style={{ height: "50vh" }}
        >
          <Doviz />
        </div>
      </div>
    </div>
  );
};

export default Anasayfa;
