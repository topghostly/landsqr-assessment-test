import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import styles from "../styles/modules/auth.module.scss";
import Button from "../component/shared/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import type { SignInData } from "../types/layout";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const [signinData, setSigninData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login } = useAuth();

  // Switch password input type
  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Stores changes in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninData((prev: SignInData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Makes sure email matches a mail structure
    if (!isValidEmail(signinData.email)) {
      alert("Invalid email format.");
      return;
    }

    // Makes sure password is more than 6 characters
    if (signinData.password.length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }

    // Log in admin
    login({
      name: "Adedeji Issac",
      email: signinData.email,
    });

    // Redirect to the dashboard after successful login
    navigate("/");
  };

  // Valid mail structure with regex
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className={`${styles.authLayout} container `}>
      {/* LOGO NAVBAR */}
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link
            to={"https://lendsqr.com/"}
            target="_blank"
            className="nav__brand"
            aria-label="Visit Lendsqr homepage"
          >
            <img
              src={"/images/logo.svg"}
              alt="lendsqr logo"
              width={174}
              height={36}
            />
          </Link>
        </nav>
      </header>
      {/* MAIN AUTHENTICATION */}
      <div className={styles.auth}>
        <div className={styles.auth__illustration}>
          <img
            src={"/images/pablo-sign-in.svg"}
            alt="pablo sign in illustration"
            width={600}
            height={338}
          />
        </div>
        <div className={styles.auth__form}>
          <div className={styles.form}>
            <h1 className={styles.auth__form_header}>Welcome!</h1>
            <p className={styles.auth__form_subheader}>
              Enter details to login.
            </p>
            <form
              autoComplete="off"
              noValidate={true}
              className={styles.auth__form_container}
              onSubmit={handleSubmit}
            >
              <div className={styles.input_group}>
                <div className={styles.input_holder}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    className={styles.form_input}
                    value={signinData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className={styles.input_holder}>
                  <button
                    className={styles.toggleButton}
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={togglePassword}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="off"
                    className={styles.form_input}
                    value={signinData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
              </div>
              {/* FORGOT PASSWORD */}
              <div className={styles.forgot_password}>
                <Link to={"#"}>Forgot password?</Link>
              </div>
              <div className={styles.submit_button}>
                <Button
                  fullWidth={true}
                  variant="fill"
                  onClick={() => {}}
                  type="submit"
                  color="primary"
                >
                  LOG IN
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
