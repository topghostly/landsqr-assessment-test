import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import "../../styles/components/dashboard/_dashboard-table.scss";
import styles from "../../styles/components/dashboard/pagination.module.scss";
import UsersFilterForm from "./dashboard-filter";
import Dropdown from "../shared/dropdown";
import { useNavigate } from "react-router-dom";
import type { UserDetailsProp } from "../../types/user";
import type { FilterFn } from "@tanstack/react-table";

interface SetUserProps {
  data: UserDetailsProp[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export type Row = UserDetailsProp;

const sameDay: FilterFn<Row> = (row, columnId, filterValue) => {
  if (!filterValue) return true;

  const raw = row.getValue<string>(columnId);
  if (!raw) return false;

  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return false;

  const rowYMD = d.toISOString().slice(0, 10);
  const filterYMD = String(filterValue).slice(0, 10);

  return rowYMD === filterYMD;
};
const columnHelper = createColumnHelper<Row>();

function DashboardTable({ data, isLoading, isError, error }: SetUserProps) {
  const navigate = useNavigate();
  const columns = useMemo<ColumnDef<Row, any>[]>(() => {
    return [
      columnHelper.accessor("organisation_name", {
        header: () => (
          <span>
            ORGANIZATION <UsersFilterForm table={table} />
          </span>
        ),
        cell: (info) => info.getValue(),
        filterFn: "includesString",
      }),
      columnHelper.accessor("full_name", {
        header: () => (
          <span>
            USERNAME <UsersFilterForm table={table} />
          </span>
        ),
        cell: (info) => info.getValue(),
        filterFn: "includesString",
      }),
      columnHelper.accessor("email", {
        header: () => (
          <span>
            EMAIL <UsersFilterForm table={table} />
          </span>
        ),
        cell: (info) => info.getValue(),
        filterFn: "includesString",
      }),
      columnHelper.accessor("phone_number", {
        header: () => (
          <span>
            PHONE NUMBER <UsersFilterForm table={table} />
          </span>
        ),
        cell: (info) => info.getValue(),
        filterFn: "includesString",
      }),
      columnHelper.accessor("date_joined", {
        header: () => (
          <span>
            DATE JOINED <UsersFilterForm table={table} />
          </span>
        ),
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }),
        filterFn: sameDay,
      }),
      columnHelper.accessor("kyc_status", {
        header: () => (
          <span>
            STATUS <UsersFilterForm table={table} />
          </span>
        ),
        cell: (info) => <StatusBadge status={info.getValue()} />,
        filterFn: "equalsString",
      }),
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div>
            <Dropdown
              trigger={
                <div className="trigger-holder">
                  <img src="images/ellipses.svg" alt="ellipses" />
                </div>
              }
            >
              <ul className="options">
                <li
                  onClick={() => navigate(`/user-details/${row.original.id}`)}
                >
                  <img
                    src={"/images/np_view_1214519_000000.svg"}
                    alt="user details"
                    width={14}
                    height={14}
                  />
                  View Details
                </li>
                <li>
                  <img
                    src={"/images/np_delete-friend_3248001_000000.svg"}
                    alt="blacklist"
                    width={14}
                    height={14}
                  />
                  Blacklist User
                </li>
                <li>
                  <img
                    src={"/images/np_user_2995993_000000.svg"}
                    alt="logo"
                    width={14}
                    height={14}
                  />
                  Activate User
                </li>
              </ul>
            </Dropdown>
          </div>
        ),
        size: 80,
      },
    ];
  }, []);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const safeData = data ?? [];

  const table = useReactTable({
    data: safeData,
    columns,
    initialState: { pagination: { pageSize: 1 } },
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: { sameDay },
    getFilteredRowModel: getFilteredRowModel(),
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const range = (start: number, end: number) =>
    Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

  function buildPageItems(
    current: number,
    total: number,
    siblingCount = 1,
    boundaryCount = 1
  ): Array<number | "dots"> {
    if (total <= 0) return [];
    const startPages = range(1, Math.min(boundaryCount, total));
    const endPages = range(
      Math.max(total - boundaryCount + 1, boundaryCount + 1),
      total
    );

    const left = Math.max(current - siblingCount, boundaryCount + 1);
    const right = Math.min(current + siblingCount, total - boundaryCount);

    const middle = range(left, right);
    const showLeftDots = left > boundaryCount + 1;
    const showRightDots = right < total - boundaryCount;

    return [
      ...startPages,
      ...(showLeftDots ? (["dots"] as const) : []),
      ...middle,
      ...(showRightDots ? (["dots"] as const) : []),
      ...endPages,
    ];
  }

  const items = buildPageItems(currentPage, totalPages, 1, 1);

  return (
    <>
      <div className="page">
        {/* <UsersFilterForm table={table} /> */}
        <div className="tableWrap">
          <table className="table">
            <thead className="thead">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id} className="th">
                      <div>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="tbody">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="tr">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="td">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- PAGINATION UI ---- */}
      <div className={styles.paginationContainer}>
        <div className={styles.showing}>
          <span>Showing</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className={styles.dropdown}
          >
            {[1, 5, 10, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>out of {data?.length}</span>
        </div>

        <div className={styles.pagination}>
          <button
            className={`${styles.navButton} ${
              currentPage === 1 ? styles.disable : ""
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            ‹
          </button>

          {items.map((it, idx) =>
            it === "dots" ? (
              <span key={`d-${idx}`} className={styles.dots}>
                …
              </span>
            ) : (
              <button
                key={it}
                className={`${styles.pageNumber} ${
                  currentPage === it ? styles.active_page : ""
                }`}
                onClick={() => table.setPageIndex(it - 1)}
                aria-current={currentPage === it ? "page" : undefined}
              >
                {it}
              </button>
            )
          )}

          <button
            className={`${styles.navButton} ${
              currentPage === totalPages ? styles.disable : ""
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardTable;
const StatusBadge = ({ status }: { status: string }) => {
  return <span className={`status ${status.toLowerCase()}`}>{status}</span>;
};
