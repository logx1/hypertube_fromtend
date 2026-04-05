import styles from "./NavBar.module.css";
import PrimaryInput, { type PrimaryInputProps } from "../Input/PrimaryInput";
import { useState, useContext, useEffect, useRef } from "react";
import NotificationContext, {
  addNotification,
} from "~/context/Notification/NotificationContext";
import { useMatches, Link } from "react-router";
import { v4 as uuidv4 } from "uuid";

const NavBar = ({
  navBarStyle,
  setSideNavBarStyle,
  openSearchBox,
}: {
  navBarStyle: "full" | "collaps";
  setSideNavBarStyle: (s: "full" | "collaps") => void;
  openSearchBox: (visibility: boolean) => void;
}) => {
  const matches = useMatches();
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const searchResultRef = useRef<any>([]);
  const notificationContext = useContext(NotificationContext);

  const pushNotification = (type: "error" | "success", msg: string) => {
    addNotification(
      notificationContext,
      {
        notificationId: uuidv4(),
        notificationType: type,
        notificationMessage: msg,
      },
      3000
    );
  };

  const handleSearchInput = (e: any) => {
    setSearchInput(e.currentTarget.value);
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/search/?q="${e.currentTarget.value}"`
    )
      .then((res) => {
        if (res.status !== 200) {
          pushNotification("error", "Something went wrong");
          return;
        }
        res
          .json()
          .then((jres) => {
            console.log(searchInput, jres);
            setSearchResult(jres.results);
          })
          .catch((err) => {
            pushNotification("error", "Couldn't parse json response");
            return;
          });
      })
      .catch((err) => {
        pushNotification("error", "Couldn't reach the backend");
      });
  };

  const isInsideEditProfile = matches.some(
    (match) => match.id === "routes/editProfile/editProfile"
  );

  const changeSideNavBarStyle = () => {
    if (navBarStyle === "full") setSideNavBarStyle("collaps");
    else setSideNavBarStyle("full");
  };

  const removeSearchedItems = () => {
    // setSearchResult([]);
    // setSearchInput("");
  };

  useEffect(() => {
    searchResultRef.current = searchResult;
  }, [searchResult]);

  useEffect(() => {
    const handleClick = (e: any) => {
      // console.log(e.target.className);
      if (searchResultRef.current.length > 0) {
        setSearchResult([]);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftSide}>
        <button onClick={changeSideNavBarStyle}>
          {navBarStyle === "collaps" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
              ></path>
            </svg>
          )}
        </button>

        <p>HyperTube</p>
        <ul className={styles.navigationList}>
          <li>
            <a href="" className={"" + styles.selectedTab}>
              Browse
            </a>
          </li>
          <li>
            <a href="">Live</a>
          </li>
          <li>
            <a href="">Following</a>
          </li>
        </ul>
      </div>
      {!isInsideEditProfile && (
        <div className={styles.center}>
          <button
            className={styles.searchForMoviesBtn}
            onClick={() => {
              openSearchBox(true);
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"
                ></path>
              </svg>
            </span>
            <span className={styles.buttonTxt}>Search</span>
          </button>
          {/* <PrimaryInput
            value={searchInput}
            onChange={handleSearchInput}
            type="text"
            placeHolder="Search for videos"
            width="100%"
            name="searchInput"
            onBlur={removeSearchedItems}
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M11.02 11.727a5.5 5.5 0 1 1 .707-.707l3.127 3.126a.5.5 0 0 1-.708.708zM12 7.5a4.5 4.5 0 1 0-9 0a4.5 4.5 0 0 0 9 0"
                ></path>
              </svg>
            }
          /> */}
        </div>
      )}

      <div className={styles.rightSide}>
        <img
          src="http://localhost:3000/public/ff.avif"
          className={styles.navBarImg}
        />
      </div>
    </nav>
  );
};

export default NavBar;
