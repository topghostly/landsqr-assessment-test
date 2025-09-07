import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../component/shared/button";
import { useUserById } from "../hook/useUserById";
import LoaderBar from "../component/shared/loader";

function UserDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useUserById(id);

  const [userDetails, setUserDetails] = useState(data);

  useEffect(() => {
    setUserDetails(data);
    console.log(data);
  }, [data]);

  // Define button styles to avoid crowded jsx
  const buttonStyles = {
    blacklist: {
      color: "rgba(228, 3, 59, 1)",
      border: "solid 1px rgba(228, 3, 59, 1)",
      fontFamily: "Work Sans",
      fontWeight: 600,
    },
    activate: {
      color: "rgba(57, 205, 204, 1)",
      border: "solid 1px rgba(57, 205, 204, 1)",
      fontFamily: "Work Sans",
      fontWeight: 600,
    },
  };

  const categories = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  return (
    <div className="main">
      {/* BACK BUTTON TO USER LIST PAGE */}
      <Link to={"/"} className="main__backbutton">
        <button>
          <img
            src={"/images/np_back_3007750_000000.svg"}
            alt="back"
            width={30}
            height={30}
          />
          Back to Users
        </button>
      </Link>
      {/* USER DETAILS HEADER */}
      <div className="main__head">
        <h2 className="main__head-title">Users Details</h2>
        <div className="main__head-action">
          {/* BLACKLIST USER BUTTON */}
          <Button
            variant="outline"
            type="button"
            onClick={() => {}}
            customClass={buttonStyles.blacklist}
          >
            BLACKLIST USER
          </Button>

          {/* ACTIVATE USER BUTTON */}
          <Button
            variant="outline"
            type="button"
            onClick={() => {}}
            customClass={buttonStyles.activate}
          >
            ACTIVATER USER
          </Button>
        </div>
      </div>
      {/* USER DETAILS COMPONENTS */}
      {isLoading ? (
        <LoaderBar label="Fetching data" />
      ) : error ? (
        <div className="error_holder">
          <p>{error.message}: Please reload the page</p>
        </div>
      ) : (
        <div className="details">
          {/* USER DETAIL HEAD */}
          <div className="details__head">
            <div className="details__head-main">
              {/* USER PROFILE */}
              <div className="details__head-main_user">
                <div className="profile_pic">
                  <img
                    src={"/images/profileVector.svg"}
                    alt="profilepic"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="user_info">
                  <h2 className="main_text">{userDetails?.full_name}</h2>
                  <p className="sub_text">{userDetails?.id}</p>
                </div>
              </div>
              <div className="seperator"></div>
              <div className="details__head-main_tier">
                <p className="tier_title">User&apos;s Tier</p>
                {/* USER TIER */}
                <div className="stars_holder">
                  {/* FILLED STAR BASED ON TIRE */}
                  {Array.from(
                    { length: Number(userDetails?.user_tier) || 0 },
                    (_, index) => (
                      <img
                        key={index}
                        src={"/images/np_star_1208084_000000.svg"}
                        alt="profilepic"
                        width={16}
                        height={16}
                      />
                    )
                  )}
                  {/* EMPTY STAR FOR REMAINING TIER */}
                  {Array.from(
                    { length: 3 - Number(userDetails?.user_tier) || 0 },
                    (_, index) => (
                      <img
                        key={index}
                        src={"/images/np_star_1171151_000000.svg"}
                        alt="profilepic"
                        width={16}
                        height={16}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="seperator"></div>
              {/* USER BALANCE */}
              <div className="details__head-main_balance">
                <h2 className="main_text">
                  {userDetails?.bank.user_balance || 0}
                </h2>
                <p className="sub_text">
                  {userDetails?.bank.acct_number}/{userDetails?.bank.name}
                </p>
              </div>
            </div>
            {/* DETAILS HEAD */}
            <div className="details__head-categories">
              <div className="details__head-categories_list">
                <ul className="category_items">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      className={`category_button ${
                        index === 0 ? "active-tab" : ""
                      }`}
                    >
                      <li className="category_item">{category}</li>
                    </button>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* DETAILS BODY */}
          <div className="details__body">
            {/* PERSONAL INFORMATION */}
            <div className="details__body-section">
              <p className="title">Personal Information</p>
              <div className="grid_5">
                <div className="detail">
                  <p className="detail_title">full Name</p>
                  <p className="detail_point">{userDetails?.full_name}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Phone Number</p>
                  <p className="detail_point">{userDetails?.phone_number}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Email Address</p>
                  <p className="detail_point">{userDetails?.email}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Bvn</p>
                  <p className="detail_point">{userDetails?.bvn}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Gender</p>
                  <p className="detail_point">{userDetails?.gender}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Marital status</p>
                  <p className="detail_point">{userDetails?.marital_status}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Children</p>
                  <p className="detail_point">{userDetails?.children}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Type of residence</p>
                  <p className="detail_point">
                    {userDetails?.type_of_residence}
                  </p>
                </div>
              </div>
            </div>
            <div className="seperator"></div>
            {/* EDUCATION & EMPLOYMENT */}
            <div className="details__body-section">
              <p className="title">Education and Employment</p>
              <div className="grid_4">
                <div className="detail">
                  <p className="detail_title">level of education</p>
                  <p className="detail_point">{userDetails?.education_level}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">employment status</p>
                  <p className="detail_point">
                    {userDetails?.employment_status}
                  </p>
                </div>
                <div className="detail">
                  <p className="detail_title">sector of employment</p>
                  <p className="detail_point">
                    {userDetails?.sector_of_employment}
                  </p>
                </div>
                <div className="detail">
                  <p className="detail_title">Duration of employment</p>
                  <p className="detail_point">
                    {userDetails?.duration_of_employment}
                  </p>
                </div>
                <div className="detail">
                  <p className="detail_title">office email</p>
                  <p className="detail_point">{userDetails?.office_email}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Monthly income</p>
                  <p className="detail_point">{userDetails?.monthly_income}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">loan repayment</p>
                  <p className="detail_point">
                    {userDetails?.loan_repayment || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="seperator"></div>
            {/* USER SOCIALS */}
            <div className="details__body-section">
              <p className="title">Socials</p>
              <div className="grid_5">
                <div className="detail">
                  <p className="detail_title">Twitter</p>
                  <p className="detail_point">{userDetails?.socials.twitter}</p>
                </div>
                <div className="detail">
                  <p className="detail_title">Facebook</p>
                  <p className="detail_point">
                    {userDetails?.socials.facebook}
                  </p>
                </div>
                <div className="detail">
                  <p className="detail_title">Instagram</p>
                  <p className="detail_point">
                    {userDetails?.socials.instagram}
                  </p>
                </div>
              </div>
            </div>
            <div className="seperator"></div>
            {/* GUARANTOR */}
            <div className="details__body-section">
              <p className="title">Guarantor</p>
              <div className="grid_5">
                <div className="detail">
                  <p className="detail_title">full Name</p>
                  <p className="detail_point">
                    {userDetails?.guarantor.full_name}
                  </p>
                </div>
                <div className="detail">
                  <p className="detail_title">Phone Number</p>
                  <p className="detail_point">
                    {userDetails?.guarantor.phone_number}
                  </p>
                </div>
                <div className="detail">
                  <p className="detail_title">Email Address</p>
                  <p className="detail_point">
                    {userDetails?.guarantor.email_address}
                  </p>
                </div>
                <div className="detail">
                  <p className="detail_title">Relationship</p>
                  <p className="detail_point">
                    {userDetails?.guarantor.relationship}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="seperator"></div>
        <div className="details__body-section">
          
          <div className="grid_5">
            <div className="detail">
              <p className="detail_title">full Name</p>
              <p className="detail_point">{userDetails?.guarantor.full_name}</p>
            </div>
            <div className="detail">
              <p className="detail_title">Phone Number</p>
              <p className="detail_point">
                {userDetails?.guarantor.phone_number}
              </p>
            </div>
            <div className="detail">
              <p className="detail_title">Email Address</p>
              <p className="detail_point">
                {userDetails?.guarantor.email_address}
              </p>
            </div>
            <div className="detail">
              <p className="detail_title">Relationship</p>
              <p className="detail_point">
                {userDetails?.guarantor.relationship}
              </p>
            </div>
          </div>
        </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
