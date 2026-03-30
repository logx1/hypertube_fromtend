import styles from "./NavBar.module.css";
import PrimaryInput, { type PrimaryInputProps } from "../Input/PrimaryInput";
import { useState } from "react";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchInput = (e: any) => {
    setSearchInput(e.currentTarget.value);
  };
  return (
    <nav className={styles.navBar}>
      <div className={styles.leftSide}>
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
      <div className={styles.center}>
        <PrimaryInput
          value={searchInput}
          onChange={handleSearchInput}
          type="text"
          placeHolder="Search for videos"
          width="100%"
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
        />
      </div>
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
