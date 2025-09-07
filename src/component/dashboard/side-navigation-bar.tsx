import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "../shared/dropdown";

const menuItems = [
  {
    title: "CUSTOMERS",
    links: [
      { icon: "/images/user-friends.svg", label: "Users", href: "#" },
      { icon: "/images/guarantors.svg", label: "Guarantors", href: "#" },
      { icon: "/images/loan.svg", label: "Loans", href: "#" },
      { icon: "/images/handshake.svg", label: "Decision Models", href: "#" },
      { icon: "/images/piggy-bank.svg", label: "Savings", href: "#" },
      { icon: "/images/request.svg", label: "Loan Request", href: "#" },
      { icon: "/images/whitelist.svg", label: "Whitelist", href: "#" },
      { icon: "/images/user-times.svg", label: "Karma", href: "#" },
    ],
  },
  {
    title: "BUSINESSES",
    links: [
      { icon: "/images/organisation.svg", label: "Organization", href: "#" },
      { icon: "/images/loan-products.svg", label: "Loan Products", href: "#" },
      {
        icon: "/images/savings-products.svg",
        label: "Savings Products",
        href: "#",
      },
      { icon: "/images/coins-solid.svg", label: "Fees and Charges", href: "#" },
      { icon: "/images/transaction.svg", label: "Transactions", href: "#" },
      { icon: "/images/galaxy.svg", label: "Services", href: "#" },
      {
        icon: "/images/service-account.svg",
        label: "Service Account",
        href: "#",
      },
      { icon: "/images/scroll.svg", label: "Settlements", href: "#" },
      { icon: "/images/chart-bar.svg", label: "Reports", href: "#" },
    ],
  },
  {
    title: "SETTINGS",
    links: [
      { icon: "/images/sliders-h.png", label: "Preferences", href: "#" },
      {
        icon: "/images/badge-percent.svg",
        label: "Fees and Pricing",
        href: "#",
      },
      { icon: "/images/audit.svg", label: "Audit Logs", href: "#" },
    ],
  },
];

// Component for rendering menu sections dynamically
const MenuList = () => {
  return (
    <ul className="sidenav__nav">
      {menuItems.map((section) => (
        <div key={section.title} className="holder">
          <li className="sidenav__nav-title">{section.title}</li>
          {section.links.map((item) => (
            <div
              key={item.label}
              className={`sidenav__nav-tooltip ${
                "Users" === item.label && "active-link"
              }`}
            >
              <Link to={item.href}>
                <li>
                  <span>
                    <img
                      src={item.icon}
                      alt={`${item.label} icon`}
                      width={16}
                      height={16}
                    />
                  </span>
                  {item.label}
                </li>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </ul>
  );
};

// Sidebar Component
const SideNavBar: React.FC = () => {
  return (
    <aside className="sidenav">
      {/* ORGANISATION SWITCHER */}
      <div className="sidenav__action">
        <div className="sidenav__action-organisation">
          <img
            src={"/images/briefcase.svg"}
            alt="briefcase icon"
            width={16}
            height={16}
          />
          Switch Organisation
          <Dropdown
            trigger={
              <img
                src={"/images/dropdown-outline.svg"}
                alt="dropdown icon"
                width={14}
                height={14}
              />
            }
          >
            <ul>
              <li>LendSqr</li>
            </ul>
          </Dropdown>
        </div>

        {/* DASHBOARD LINK */}
        <div className="sidenav__action-tab">
          <span>
            <img
              src={"/images/home.svg"}
              alt="briefcae icon"
              width={16}
              height={16}
            />
          </span>
          Dashboard
        </div>
      </div>
      <MenuList />
    </aside>
  );
};

export default SideNavBar;
