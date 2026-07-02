import { useState, useContext } from "react";
import styles from "./editProfile.module.css";
import PrimaryInput from "~/components/Input/PrimaryInput";
import PrimaryButton from "~/components/Button/PrimaryButton";
import NotificationContext, {
  addNotification,
} from "~/context/Notification/NotificationContext";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "~/tools/getCookie";
import type { Route } from "./+types/editProfile";
import { redirect } from "react-router";

interface editProfileInfos {
  fullName: string;
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  currentPassword: string;
  newPassword: string;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const authToken: string | undefined = getCookie(document.cookie, "token");
  if (!authToken) {
    return redirect("/login");
  }

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (res.status !== 200) {
    return null
  }
  const info = await res.json();
  return info;
}

export default function EditProfile({ loaderData }: Route.ComponentProps) {
  const userInfo = loaderData;

  const [formInfos, setFormInfos] = useState<editProfileInfos>({
    fullName: "",
    firstName: userInfo?.json.first_name || "",
    lastName: userInfo?.json.last_name || "",
    username: "",
    emailAddress: userInfo?.json.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const notificationContext = useContext(NotificationContext);

  // console.log(userInfo);

  const handleInputChange = (e: any) => {
    setFormInfos({ ...formInfos, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    console.log(formInfos);
    const cookie = getCookie(document.cookie, "token");
    if (!cookie) {
      console.log("No auth cookie");
      return;
    }

    // console.log(userInfo);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        auth: {
          username: formInfos.username,
          first_name: formInfos.firstName,
          last_name: formInfos.lastName,
          email: formInfos.emailAddress,
          imageUrl: 'kk',
        }
      }),
    })
      .then(async (res) => {
        console.log(res);
        console.log(await res.json())
      })
      .catch((err) => {});
    // addNotification(
    //   notificationContext,
    //   {
    //     notificationId: uuidv4(),
    //     notificationMessage: "Okay",
    //     notificationType: "success",
    //   },
    //   4000
    // );
  };

  return (
    <div className={styles.editProfileContainer}>
      <button style={{color: "White"}}
      onClick={()=>{
        // console.log(userInfo)
        const date = new Date();
      const tomorrow = new Date(date)
      tomorrow.setDate(date.getDate() + 1)
      console.log(tomorrow)
      }}>check</button>
      <div className={styles.pageHeader}>
        <h1>Account settings</h1>
        <p>Manage your profile information and security preference</p>
      </div>
      <div className={styles.personalInformationsContainer}>
        <h2>
          {/* <span> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
              clipRule="evenodd"
            />
          </svg>
          {/* </span>{" "} */}
          Personal Informations
        </h2>

        <div className={styles.personalInformationsEditor}>
          <div className={styles.avatarContainer}>
            <img src="http://localhost:3000/public/ff.avif" alt="" />
            <p>JPG or PNG. Max 2 MB</p>
          </div>
          <form className={styles.infosContainer} action={saveChanges}>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputHolder}>
                <label htmlFor="">First name</label>
                <PrimaryInput
                  type="text"
                  placeHolder="First name"
                  value={formInfos.firstName}
                  onChange={handleInputChange}
                  width="100%"
                  name="firstName"
                  leftIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </div>
              <div className={styles.inputHolder}>
                <label htmlFor="">Last name</label>
                <PrimaryInput
                  type="text"
                  placeHolder="Last name"
                  value={formInfos.lastName}
                  name="lastName"
                  leftIcon={<span></span>}
                  onChange={handleInputChange}
                  width="100%"
                />
              </div>
            </div>
            <div className={styles.inputsWrapper}>
           
              <div className={styles.inputHolder}>
                <label htmlFor="">username</label>
                <PrimaryInput
                  type="text"
                  placeHolder="username"
                  value={formInfos.username}
                  name="username"
                  onChange={handleInputChange}
                  width="100%"
                  leftIcon={<span></span>}
                />
              </div>
              <div className={styles.inputHolder}>
                <label htmlFor="">Email</label>
                <PrimaryInput
                  type="text"
                  placeHolder="example@email.com"
                  value={formInfos.emailAddress}
                  name="emailAddress"
                  onChange={handleInputChange}
                  width="100%"
                  leftIcon={<span></span>}
                />
              </div>
            </div>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputHolder}>
                <label htmlFor="">Current password</label>
                <PrimaryInput
                  type="password"
                  placeHolder="My current password"
                  value={formInfos.currentPassword}
                  onChange={handleInputChange}
                  width="100%"
                  name="currentPassword"
                  leftIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </div>
              <div className={styles.inputHolder}>
                <label htmlFor="">New password</label>
                <PrimaryInput
                  type="password"
                  placeHolder="My new password"
                  value={formInfos.newPassword}
                  name="newPassword"
                  leftIcon={<span></span>}
                  onChange={handleInputChange}
                  width="100%"
                />
              </div>
            </div>
            <div className={styles.submitContainer}>
              <PrimaryButton
                text="Submit changes"
                padding="10px 20px"
                width="30%"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
