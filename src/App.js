import { Routes, Route, BrowserRouter } from "react-router-dom";

import Anasayfa from "./Anasayfa";
import Giris from "./Giris";
import Kaydol from "./Kaydol";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabase";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Giris />}></Route>
          <Route path="/kaydol" element={<Kaydol />}></Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Anasayfa user={session.user} />}></Route>
          <Route path="/giris" element={<Giris />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
};
export default App;
