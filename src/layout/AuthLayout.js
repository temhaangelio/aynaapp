import { Outlet, Navigate } from "react-router-dom";
import { useSessionKontrol } from "../config/hooks";

export default function AuthLayout() {
  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <Outlet />
    </div>
  );
}
