import type { ReactNode } from "react";
import SideNavBar from "../component/dashboard/side-navigation-bar";
import Navbar from "../component/shared/navigation-bar";
import "../styles/modules/dashboard.scss";
import { Outlet } from "react-router-dom";

export interface ChildrenLayoutProp {
  children: ReactNode;
}

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard__aside">
          <SideNavBar />
        </div>
        <main className="dashboard__main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
