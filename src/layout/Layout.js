import { useSessionKontrol } from "../config/hooks";
import { Outlet, Navigate } from "react-router-dom";
export default function Layout() {
  const session = useSessionKontrol();
  if (!session) return <Navigate replace to="/giris" />;
  <div>
    <Outlet />
  </div>;
}
