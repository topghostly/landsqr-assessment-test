import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import Button from "../shared/button";
import Dropdown from "../shared/dropdown";
import type { UserDetailsProp } from "../../types/user";

type FormState = {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
};

const initialForm: FormState = {
  organization: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
};

export default function UsersFilterForm({
  table,
}: {
  table: Table<UserDetailsProp>;
}) {
  const [form, setForm] = useState<FormState>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleReset = () => {
    setForm(initialForm);
    table.resetColumnFilters();
  };

  const handleSubmit = () => {
    table
      .getColumn("organisation_name")
      ?.setFilterValue(form.organization || undefined);
    table.getColumn("full_name")?.setFilterValue(form.username || undefined);
    table.getColumn("email")?.setFilterValue(form.email || undefined);
    table
      .getColumn("phone_number")
      ?.setFilterValue(form.phoneNumber || undefined);
    table.getColumn("kyc_status")?.setFilterValue(form.status || undefined);
    table.getColumn("date_joined")?.setFilterValue(form.date || undefined);
  };

  return (
    <Dropdown
      trigger={
        <button aria-label="Open filters" className="trigger-button">
          <img src="/images/filter-results-button.svg" alt="funnel" />
        </button>
      }
    >
      <div className="filter-form">
        {/* ORGANIZATION FILTER */}
        <label>
          Organization
          <select
            name="organization"
            value={form.organization}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Access Bank">Access Bank</option>
            <option value="Algora Analytics">Algora Analytics</option>
            <option value="Andela">Andela</option>
            <option value="Carbon">Carbon</option>
            <option value="Dangote Group">Dangote Group</option>
            <option value="Flour Mills of Nigeria">
              Flour Mills of Nigeria
            </option>
            <option value="Flutterwave">Flutterwave</option>
            <option value="Globacom">Globacom</option>
            <option value="IHS Towers">IHS Towers</option>
            <option value="Interswitch">Interswitch</option>
            <option value="Jumia">Jumia</option>
            <option value="Konga">Konga</option>
            <option value="Lendsqr">Lendsqr</option>
            <option value="M-KOPA">M-KOPA</option>
            <option value="MTN Nigeria">MTN Nigeria</option>
            <option value="NITDA">NITDA</option>
            <option value="Nigerian Breweries">Nigerian Breweries</option>
            <option value="OPay">OPay</option>
            <option value="Paystack">Paystack</option>
            <option value="Sears Home Services">Sears Home Services</option>
            <option value="Shell Nigeria">Shell Nigeria</option>
            <option value="Total Energies">Total Energies</option>
            <option value="UBA">UBA</option>
            <option value="Zenith Bank">Zenith Bank</option>
          </select>
        </label>

        {/* USERNAME FILTER */}
        <label>
          Username
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="User"
            autoComplete="off"
          />
        </label>

        {/* EMAIL FILTER */}
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="off"
          />
        </label>

        {/* DATE FILTER */}
        <label>
          Date
          <div className="date-holder">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              autoComplete="off"
            />
            <img
              src={"/images/np_calendar_2080577_000000.svg"}
              alt="calendar"
              width={16}
              height={16}
            />
          </div>
        </label>

        {/* PHONE NUMBER FILTER */}
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            autoComplete="off"
          />
        </label>

        {/* KYC STATUS FILTER */}
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blacklisted">Blacklisted</option>
            <option value="Pending">Pending</option>
          </select>
        </label>

        {/* BUTTONS */}
        <div className="buttons">
          <Button
            type="button"
            fullWidth={true}
            variant="outline"
            onClick={handleReset}
            customClass={{
              border: "solid 1px rgba(84, 95, 125, 1)",
              color: "rgba(84, 95, 125, 1)",
            }}
          >
            Reset
          </Button>

          <Button
            type="button"
            variant="fill"
            color="primary"
            onClick={handleSubmit}
            fullWidth={true}
          >
            Filter
          </Button>
        </div>
      </div>
    </Dropdown>
  );
}
