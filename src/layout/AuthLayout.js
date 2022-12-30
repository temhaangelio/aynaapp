import { Outlet, Navigate } from "react-router-dom";
import { useSessionKontrol } from "../config/hooks";

export default function AuthLayout() {
  const session = useSessionKontrol();
  if (session) return <Navigate replace to="/" />;
  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <Outlet />
    </div>
  );
}
