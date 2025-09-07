import type { ReactNode } from "react";
import "../styles/modules/auth.scss";
import { Outlet } from "react-router-dom";

export interface ChildrenLayoutProp {
  children: ReactNode;
}

const AuthLayout = () => {
  return (
    <>
      <main className="auth__main">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
