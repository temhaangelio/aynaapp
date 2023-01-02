import { supabase } from "./config/supabase";
import { useState, useEffect } from "react";
import Giris from "./Giris";
import Anasayfa from "./Anasayfa";

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

  return <div>{!session ? <Giris /> : <Anasayfa />}</div>;
};

export default App;
