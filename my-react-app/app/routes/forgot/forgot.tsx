import type { Route } from "./+types/forgot";
import styles from "./forgot.module.css";
import PrimaryInput from "~/components/Input/PrimaryInput";
import PrimaryButton from "~/components/Button/PrimaryButton";
import React, { useState } from "react";
import { Link } from "react-router";

export default function Forgot() {
  const [emailInput, setEmailInput] = useState<string>("");

  const submit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log(emailInput);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
      }),
    })
      .then((res) => {
        if (res.status != 200) {
          console.log("Somthing wehnt wong");
          return;
        }
        res
          .json()
          .then((jres) => {
            console.log(jres);
          })
          .catch((err) => {
            console.log("Unexpected response format");
          });
      })
      .catch((err) => {
        console.log("Couldn't reach server");
      });
  };

  return (
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
          <h1>Reset your password</h1>
          <p>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
        </div>

        <form className={styles.boxBody} onSubmit={submit}>
          <PrimaryInput
            width="100%"
            placeHolder="Email"
            type="email"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.currentTarget.value);
            }}
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18.75 12a6.75 6.75 0 1 0-3.375 5.846a.75.75 0 0 1 .75 1.299A8.251 8.251 0 1 1 20.25 12a.75.75 0 0 1-1.5 0"
                ></path>
                <path
                  fill="currentColor"
                  d="M15.75 13a1.5 1.5 0 0 0 3 0h1.5a3 3 0 0 1-6 0z"
                ></path>
                <path
                  fill="currentColor"
                  d="M14.25 12a2.25 2.25 0 1 0-4.5 0a2.25 2.25 0 0 0 4.5 0m1.5 0a3.75 3.75 0 1 1-7.5 0a3.75 3.75 0 0 1 7.5 0m4.5-.75V13h-1.5v-1.75z"
                ></path>
                <path
                  fill="currentColor"
                  d="M14.25 14V9a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-1.5 0"
                ></path>
              </svg>
            }
            name="email"
          />
          <PrimaryButton text="Send reset link" />
          <Link to="/login">Back to sign in</Link>
        </form>
      </div>
    </div>
  );
}
