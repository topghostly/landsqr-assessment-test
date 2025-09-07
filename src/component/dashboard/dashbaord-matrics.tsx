import React, { useEffect, useMemo, useState } from "react";
import { type MatricsCardProps } from "../../types/layout";
import type { UserDetailsProp } from "../../types/user";

const MatricsCard: React.FC<MatricsCardProps> = ({
  icon,
  label,
  value,
  color,
}) => {
  return (
    <div className="matrics__card">
      <div className={`matrics__card-image ${color}`}>
        <img src={icon} alt={label} width={22} height={22} />
      </div>
      <div className="matrics__card-text">{label}</div>
      <div className="matrics__card-stat">{value}</div>
    </div>
  );
};

const DashboardMatrics = ({ data }: { data: UserDetailsProp[] }) => {
  const activeUsers = useMemo(
    () => data?.filter((user: UserDetailsProp) => user.active),
    [data]
  );

  const metrics = [
    {
      label: "USERS",
      value: data ? data.length : 0,
      icon: "/images/np_users_1248631_000000.svg",
      color: "purple",
    },
    {
      label: "ACTIVE USERS",
      value: data ? activeUsers.length : 0,
      icon: "/images/np_users_1977590_000000.svg",
      color: "blue",
    },
    {
      label: "USERS WITH LOANS",
      value: 174,
      icon: "/images/np_loan_1243991_000000.svg",
      color: "orange",
    },
    {
      label: "USERS WITH SAVINGS",
      value: 192,
      icon: "/images/np_money_549109_000000.svg",
      color: "red",
    },
  ];

  return (
    <div className="matrics">
      {metrics.map((metric, index) => (
        <MatricsCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default DashboardMatrics;
