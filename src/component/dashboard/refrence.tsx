import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";

/** ---------- STABLE SAMPLE DATA (keep outside component) ---------- */
const DUMMY_DATA = [
  {
    id: "1550d711-427b-473f-b0e3-2b7465a494ff",
    full_name: "Ishola Ojo",
    phone_number: "07094078161",
    email: "ishola.ojo0@lendsqr.com",
    organisation_name: "Lendsqr",
    date_joined: "2021-11-27T09:00:00Z",
    kyc_status: "Active",
  },
  {
    id: "39fd96d5-c889-4ccb-a90b-1664eef4b6bd",
    full_name: "Chiamaka Umar",
    phone_number: "08084969653",
    email: "chiamaka.umar1@zenith-bank.com",
    organisation_name: "Zenith Bank",
    date_joined: "2024-11-29T09:00:00Z",
    kyc_status: "Active",
  },
  {
    id: "2c44624f-1ad2-495c-a06c-5df36d173403",
    full_name: "Mariam Ogunjobi",
    phone_number: "08182278248",
    email: "mariam.ogunjobi2@paystack.com",
    organisation_name: "Paystack",
    date_joined: "2025-03-17T09:00:00Z",
    kyc_status: "Pending",
  },
] as const;

/** ---------- TYPES ---------- */
type Row = (typeof DUMMY_DATA)[number];
const columnHelper = createColumnHelper<Row>();

/** ---------- WORKING TABLE COMPONENT ---------- */
export default function DashboardTable() {
  /** columns must be memoized */
  const columns = useMemo<ColumnDef<Row, any>[]>(() => {
    return [
      columnHelper.accessor("organisation_name", {
        header: () => <span>ORGANIZATION</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("full_name", {
        header: () => <span>USERNAME</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: () => <span>EMAIL</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("phone_number", {
        header: () => <span>PHONE NUMBER</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("date_joined", {
        header: () => <span>DATE JOINED</span>,
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }),
      }),
      columnHelper.accessor("kyc_status", {
        header: () => <span>STATUS</span>,
        cell: (info) => <StatusBadge status={info.getValue()} />,
      }),
    ];
  }, []);

  /** control pagination explicitly (stable state) */
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1, // default; you can change via the select
  });

  const table = useReactTable({
    data: DUMMY_DATA, // already stable (defined outside)
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // REQUIRED for items-per-page to work
  });

  return (
    <div style={{ padding: 16 }}>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead style={{ background: "#f9fafb" }}>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: 12,
                    }}
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ padding: "12px 16px", whiteSpace: "nowrap" }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Showing</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            style={{ padding: "6px 8px" }}
          >
            {[1, 2, 3, 5, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>out of {DUMMY_DATA.length}</span>
        </div>

        {/* NEWWWWWWWWWW */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            « First
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ‹ Prev
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next ›
          </button>
          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            Last »
          </button>
        </div>
      </div>
    </div>
  );
}

/** minimal status badge */
function StatusBadge({ status }: { status: string }) {
  const cls = status.toLowerCase();
  const style: React.CSSProperties =
    cls === "active"
      ? {
          color: "rgba(57,205,98,1)",
          background: "rgba(57,205,98,.06)",
          padding: "4px 8px",
          borderRadius: 9999,
        }
      : cls === "pending"
      ? {
          color: "rgba(233,178,0,1)",
          background: "rgba(233,178,0,.06)",
          padding: "4px 8px",
          borderRadius: 9999,
        }
      : cls === "blacklisted"
      ? {
          color: "rgba(228,3,59,1)",
          background: "rgba(228,3,59,.06)",
          padding: "4px 8px",
          borderRadius: 9999,
        }
      : {
          color: "rgba(84,95,125,1)",
          background: "rgba(84,95,125,.06)",
          padding: "4px 8px",
          borderRadius: 9999,
        };

  return <span style={style}>{status}</span>;
}
