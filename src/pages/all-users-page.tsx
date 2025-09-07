import React, { useEffect } from "react";
import DashboardMatrics from "../component/dashboard/dashbaord-matrics";
import DashboardTable from "../component/dashboard/dashboard-table";
import { useUsers } from "../hook/useUser";
import LoaderBar from "../component/shared/loader";

const AllUserPage: React.FC = () => {
  // const { logout } = useAuth();
  // useEffect(() => {
  //   if (typeof window === "undefined") return; // Prevents running on the server for Hydration Errors
  //   const storedAuth: string | null = localStorage.getItem("auth_data");

  //   if (storedAuth) {
  //     const { isLoggedIn } = JSON.parse(storedAuth || "");
  //     if (!isLoggedIn) logout();
  //   } else {
  //     logout();
  //   }
  // }, [logout]);.msg

  const { data, isLoading, isError, error } = useUsers();

  return (
    <div className="main">
      {/* DASGBOARD HEADER TITLE */}
      <div className="main__head">
        <h2 className="main__head-title">Users</h2>
      </div>
      <div className="main__body">
        {/* DASHBOARD MATRICS CARD COMPONENT */}
        <DashboardMatrics data={data} />
        {/* DASHBOARD USER LIST TABLE COMPONENT */}
        {isLoading ? (
          <LoaderBar label="Fetching data" />
        ) : error ? (
          <div className="error_holder">
            <p>{error.message}: Please reload the page</p>
          </div>
        ) : (
          <DashboardTable
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default AllUserPage;
