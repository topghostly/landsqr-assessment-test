import React, { type ReactNode } from "react";

export interface ChildrenLayoutProp {
  children: ReactNode;
}

export interface BtnProp {
  children: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  color?: "primary" | "secondary";
  variant: "fill" | "outline" | "text";
  onClick: () => void;
  fullWidth?: boolean;
  customClass?: React.CSSProperties;
}

export interface userDetailsPageProp {
  currentUserID: string | string[] | undefined;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export interface MatricsCardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

export interface FilterPageProps {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SignInData {
  email: string;
  password: string;
}

export type FormState = {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
};

export type LoadingProps = {
  fixedTop?: boolean;
  label?: string;
};

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export interface ChildrenLayoutProp {
  children: ReactNode;
}

export interface SignInData {
  email: string;
  password: string;
}
