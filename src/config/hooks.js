import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

export const useSessionKontrol = () => {
  const session = supabase.auth.getSession();
  const [user, setUser] = useState(session?.user ?? null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return user;
};
