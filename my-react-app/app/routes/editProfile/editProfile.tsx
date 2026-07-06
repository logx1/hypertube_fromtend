import { useState, useContext, useCallback } from "react";
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
import PopupBox, { type PopupBoxConfig } from "~/components/PopupBox/PopupBox";

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
    return null;
  }
  const info = await res.json();
  return info;
}

export default function EditProfile({ loaderData }: Route.ComponentProps) {
  const userInfo = loaderData;
  console.log(userInfo);

  const [formInfos, setFormInfos] = useState<editProfileInfos>({
    fullName: "",
    firstName: userInfo?.json.first_name || "",
    lastName: userInfo?.json.last_name || "",
    username: userInfo?.json.username || "not found",
    emailAddress: userInfo?.json.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseBox, setResponseBox] = useState<{
    showBox: boolean;
    boxConfig: any;
  }>({
    showBox: false,
    boxConfig: {
      title: "",
      description: "",
      icon: null,
      color: "",
    },
  });

  const closeBox = useCallback(() => {
    console.log("hiii");
    setResponseBox({ ...responseBox, showBox: false });
  }, []);

  const notificationContext = useContext(NotificationContext);

  // console.log(userInfo);

  const handleInputChange = (e: any) => {
    setFormInfos({ ...formInfos, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    if (isLoading) return;
    const cookie = getCookie(document.cookie, "token");
    if (!cookie) {
      console.log("No auth cookie");
      return;
    }
    setIsLoading(true);

    // console.log(userInfo);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: {
          username: formInfos.username,
          first_name: formInfos.firstName,
          last_name: formInfos.lastName,
          email: formInfos.emailAddress,
          imageUrl: "kk",
        },
      }),
    })
      .then(async (res) => {
        setIsLoading(false);

        if (res.status === 404) {
          setResponseBox((currentState) => {
            const newState = { ...currentState };
            newState.showBox = true;
            const newConfigBox = { ...newState.boxConfig };
            newConfigBox.title = "Failed";
            newConfigBox.description = "Couldn't Find the backend enpoint";
            newConfigBox.icon = (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M1017.06 186.064L917.364 74.721a31.96 31.96 0 0 0-23.937-10.752H543.171V30.001c0-16.56-14.336-30-32-30s-32 13.44-32 30V63.97H223.363c-17.68 0-32 14.32-32 32v223.664c0 17.68 14.32 32 32 32h255.808v64.096H130.58a31.96 31.96 0 0 0-23.936 10.752L6.963 539.793c-10.752 12.128-10.752 30.368 0 42.496l99.68 112.288c6.112 6.847 14.784 9.744 23.936 9.744h348.592V994c0 16.56 14.336 30 32 30s32-13.44 32-30V704.32h256.464c17.68 0 32-14.32 32-32V447.713c0-17.68-14.32-32-32-32H543.171v-64.096h350.256a31.96 31.96 0 0 0 23.937-10.752l99.696-112.32c10.736-12.112 10.736-30.352 0-42.48zM767.647 640.321H144.959l-71.28-79.28l71.28-81.312h622.688zm111.392-352.688h-623.68V127.969h623.68l71.28 79.344z"
                ></path>
              </svg>
            );
            newConfigBox.color = "rgba(128, 0, 0, 0.303)";
            newState.boxConfig = newConfigBox;
            return newState;
          });
        }

        console.log(res);
        console.log(await res.json());
      })
      .catch((err) => {
        setIsLoading(false);
        setResponseBox((currentState) => {
          const newState = { ...currentState };
          newState.showBox = true;
          const newConfigBox = { ...newState.boxConfig };
          newConfigBox.title = "Failed";
          newConfigBox.description = "Couldn't reach the backend server";
          newConfigBox.icon = (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M1017.06 186.064L917.364 74.721a31.96 31.96 0 0 0-23.937-10.752H543.171V30.001c0-16.56-14.336-30-32-30s-32 13.44-32 30V63.97H223.363c-17.68 0-32 14.32-32 32v223.664c0 17.68 14.32 32 32 32h255.808v64.096H130.58a31.96 31.96 0 0 0-23.936 10.752L6.963 539.793c-10.752 12.128-10.752 30.368 0 42.496l99.68 112.288c6.112 6.847 14.784 9.744 23.936 9.744h348.592V994c0 16.56 14.336 30 32 30s32-13.44 32-30V704.32h256.464c17.68 0 32-14.32 32-32V447.713c0-17.68-14.32-32-32-32H543.171v-64.096h350.256a31.96 31.96 0 0 0 23.937-10.752l99.696-112.32c10.736-12.112 10.736-30.352 0-42.48zM767.647 640.321H144.959l-71.28-79.28l71.28-81.312h622.688zm111.392-352.688h-623.68V127.969h623.68l71.28 79.344z"
              ></path>
            </svg>
          );
          newConfigBox.color = "rgba(128, 0, 0, 0.303)";

          return newState;
        });
      });
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
      {responseBox.showBox && (
        <PopupBox
          title={responseBox.boxConfig.title}
          description={responseBox.boxConfig.description}
          icon={responseBox.boxConfig.icon}
          color={responseBox.boxConfig.color}
          closeBox={closeBox}
        />
      )}

      <button
        style={{ color: "White" }}
        onClick={() => {
          // console.log(userInfo)
          const date = new Date();
          const tomorrow = new Date(date);
          tomorrow.setDate(date.getDate() + 1);
          console.log(tomorrow);
        }}
      >
        check
      </button>
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
            {/* <div className={styles.inputsWrapper}>
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
            </div> */}
            <div className={styles.submitContainer}>
              <PrimaryButton
                text="Submit changes"
                padding="10px 20px"
                width="30%"
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
