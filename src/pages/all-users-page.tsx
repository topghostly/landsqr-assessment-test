import React from "react";
import DashboardMatrics from "../component/dashboard/dashbaord-matrics";
import DashboardTable from "../component/dashboard/dashboard-table";
import { useUsers } from "../hook/useUser";
import LoaderBar from "../component/shared/loader";
import type { UserDetailsProp } from "../types/user";
import { getErrorMessage } from "../lib/handle-error";

const AllUserPage: React.FC = () => {
  const { data, isLoading, isError, error } = useUsers();
  const safeData: UserDetailsProp[] = Array.isArray(data) ? data : [];

  return (
    <div className="main">
      {/* DASGBOARD HEADER TITLE */}
      <div className="main__head">
        <h2 className="main__head-title">Users</h2>
      </div>
      <div className="main__body">
        {/* DASHBOARD MATRICS CARD COMPONENT */}
        <DashboardMatrics data={safeData} />
        {/* DASHBOARD USER LIST TABLE COMPONENT */}
        {isLoading ? (
          <LoaderBar label="Fetching data" />
        ) : error ? (
          <div className="error_holder">
            <p>{getErrorMessage(error)}: Please reload the page</p>
          </div>
        ) : (
          <DashboardTable
            data={safeData}
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
