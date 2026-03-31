import { useState, useContext } from "react";
import styles from "./editProfile.module.css";
import PrimaryInput from "~/components/Input/PrimaryInput";
import PrimaryButton from "~/components/Button/PrimaryButton";
import NotificationContext, {
  addNotification,
} from "~/context/Notification/NotificationContext";
import { v4 as uuidv4 } from "uuid";

interface editProfileInfos {
  fullName: string;
  displayName: string;
  emailAddress: string;
  currentPassword: string;
  newPassword: string;
}

export default function EditProfile() {
  const [formInfos, setFormInfos] = useState<editProfileInfos>({
    fullName: "",
    displayName: "",
    emailAddress: "",
    currentPassword: "",
    newPassword: "",
  });

  const notificationContext = useContext(NotificationContext);

  const handleInputChange = (e: any) => {
    setFormInfos({ ...formInfos, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    console.log(formInfos);
    addNotification(
      notificationContext,
      {
        notificationId: uuidv4(),
        notificationMessage: "Okay",
        notificationType: "success",
      },
      4000
    );
  };

  return (
    <div className={styles.editProfileContainer}>
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
                <label htmlFor="">Full name</label>
                <PrimaryInput
                  type="text"
                  placeHolder="Full name"
                  value={formInfos.fullName}
                  onChange={handleInputChange}
                  width="100%"
                  name="fullName"
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
                <label htmlFor="">Display name</label>
                <PrimaryInput
                  type="text"
                  placeHolder="Display name"
                  value={formInfos.displayName}
                  name="displayName"
                  leftIcon={<span></span>}
                  onChange={handleInputChange}
                  width="100%"
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.inputHolder}>
                <label htmlFor="">Email</label>
                <PrimaryInput
                  type="email"
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
              <PrimaryButton text="Submit changes" padding="10px 20px" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
