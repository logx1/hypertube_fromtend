import styles from "./reset.module.css";
import { useParams } from "react-router";
import { useState, type ChangeEvent, type ReactHTMLElement } from "react";
import PrimaryInput from "~/components/Input/PrimaryInput";
import PrimaryButton from "~/components/Button/PrimaryButton";
import { Link } from "react-router";

const Reset = () => {
  let { token } = useParams();

  const [password, setPassword] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const updatePassword = (e: React.SubmitEvent) => {
    e.preventDefault();

    console.log(token);
    console.log(password);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user/new_password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        new_password: password.password,
        new_password_confirmation: password.confirmPassword,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("no server");
      });
  };

  console.log(token);
  return (
    <div>
      <div className={styles.forgotContainer}>
        <div className={styles.forgotHolder}>
          <div className={styles.header}>
            <div className={styles.iconBox}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="var(--primaryColor)"
                  d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77c1.53 0 2.78 1.24 2.78 2.77zm-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37"
                ></path>
              </svg>
            </div>
            <h1>Update your password</h1>
            <p>Enter the new password you want to use</p>
          </div>

          <form className={styles.boxBody} onSubmit={updatePassword}>
            <PrimaryInput
              width="100%"
              placeHolder="Password"
              type="password"
              value={password.password}
              onChange={handleInputChange}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M2 19v-2h20v2zm1.15-6.05l-1.3-.75l.85-1.5H1V9.2h1.7l-.85-1.45L3.15 7L4 8.45L4.85 7l1.3.75L5.3 9.2H7v1.5H5.3l.85 1.5l-1.3.75l-.85-1.5zm8 0l-1.3-.75l.85-1.5H9V9.2h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H15v1.5h-1.7l.85 1.5l-1.3.75l-.85-1.5zm8 0l-1.3-.75l.85-1.5H17V9.2h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H23v1.5h-1.7l.85 1.5l-1.3.75l-.85-1.5z"
                  ></path>
                </svg>
              }
              name="password"
            />
            <PrimaryInput
              width="100%"
              placeHolder="Confirm Password"
              type="password"
              value={password.confirmPassword}
              onChange={handleInputChange}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={26}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11l6 6l10 -10"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.6s"
                      values="26;0"
                    ></animate>
                  </path>
                </svg>
              }
              name="confirmPassword"
            />
            <PrimaryButton text="Update Password" />
            <Link to="/login">Back to sign in</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
