import React from "react";

export interface UserDetailsProp {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  bvn: string;
  bank: {
    name: string;
    acct_number: string;
    user_balance: string;
  };
  gender: "Male" | "Female";
  marital_status: "Single" | "Married";
  children: string;
  type_of_residence: "Own's Apartment" | "Parent's Apartment";
  education_level: "HND" | "Diploma" | "M.Sc" | "B.Sc" | "M.Sc";
  employment_status: string;
  sector_of_employment: string;
  duration_of_employment: string;
  office_email: string;
  organisation_name: string;
  monthly_income: string;
  loan_repayment: string;
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    full_name: string;
    phone_number: string;
    email_address: string;
    relationship: string;
  };
  savings: string;
  date_joined: string;
  kyc_status: "Active" | "Blacklisted" | "Inactive" | "Pending";
  user_tier: string;
  profile_image: string;
  active_loan: {
    total_loan: string;
  };
  active: boolean;
}

export interface userContextProps {
  users: UserDetailsProp[] | null;
  loading: boolean;
  pageItems: UserDetailsProp[] | null;
  totalPages: number;
  totalUsers: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filters: userFilterProps;
  setFilters: React.Dispatch<React.SetStateAction<userFilterProps>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface userFilterProps {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}
