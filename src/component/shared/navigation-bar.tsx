import { Link } from "react-router-dom";
import Button from "./button.tsx";
import Dropdown from "./dropdown.tsx";
import SideNavBar from "../dashboard/side-navigation-bar.tsx";
import { useState } from "react";

import styles from "../../styles/modules/navbar.module.scss";

const Navbar: React.FC = () => {
  const [activeSidebar, setActiveSideBar] = useState<boolean>(false);
  return (
    <nav className={styles.navbar}>
      {/* HIDE AND VIEW SIDEBAR BUTTON */}
      <div
        className={styles.navbar__control}
        onClick={() => {
          setActiveSideBar((prev) => !prev);
        }}
      >
        <img
          src={"/images/table_options.svg"}
          alt="logo"
          width={20}
          height={20}
        />
      </div>

      {/* SIDEBAR CONTAINER */}
      <div
        className={styles.sidenav__holder}
        style={{
          left: `${activeSidebar ? "0" : "calc(290rem * -1)"}`,
        }}
      >
        <SideNavBar />
      </div>
      <div className={styles.navbar__logo}>
        <Link
          to={"#"}
          target="_blank"
          className="nav__brand"
          aria-label="Visit Lendsqr homepage"
        >
          <img src={"/images/logo.svg"} alt="logo" width={145} height={30} />
        </Link>
      </div>

      {/* SIDEBAR FORM */}
      <form className={styles.navbar__form}>
        <div className={styles.navbar__form_group}>
          <input
            type="text"
            className={styles.navbar__form_input}
            placeholder="Search for anything"
          />
          <Button
            variant="fill"
            color="primary"
            type="button"
            onClick={() => console.log("Clicked")}
            customClass={{ borderRadius: "0 0.5rem 0.5rem 0", width: "100%" }}
          >
            <img
              src={"/images/search.svg"}
              alt="search icon"
              width={14}
              height={14}
            />
          </Button>
        </div>
      </form>

      {/* USER INFO & NOTIFICATION */}
      <div className={styles.navbar__info_holder}>
        <Link to={"#"} className={styles.doc_link}>
          Docs
        </Link>
        <div className={styles.notification_holder}>
          <Button
            type="button"
            color="primary"
            variant="text"
            onClick={() => {}}
          >
            <img
              src={"/images/notification.png"}
              alt="search icon"
              width={26}
              height={26}
            />
          </Button>
        </div>

        {/* USER PROFILE SECTION */}
        <div className={styles.user__details}>
          <img
            src={"/images/profile.png"}
            className={styles.user__details_image}
            alt="Adedeji profile picture"
            width={48}
            height={48}
          />
          <div className={styles.user__details_name}>
            <p>Adedeji</p>

            {/* DROPDOWN FOR USER ACTION */}
            <img
              src={"/images/dropdown.svg"}
              className={styles.user__details_image}
              alt="drop down image"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* HAMBURGER MENU */}
        <div className={styles.side}>
          <Dropdown
            trigger={
              <img
                src={"/images/burger-menu-svgrepo-com.svg"}
                alt="search icon"
                width={24}
                height={24}
              />
            }
          >
            <ul>
              <li>
                <div className={styles.user__details_mob}>
                  <img
                    src={"/images/profile.png"}
                    className={styles.user__details_image}
                    alt="Adedeji profile picture"
                    width={48}
                    height={48}
                  />
                  <span>Adedeji Isaac</span>
                </div>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
