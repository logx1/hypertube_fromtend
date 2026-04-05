import styles from "./SearchBox.module.css";
import PrimaryInput from "../Input/PrimaryInput";
import { useState, type ChangeEvent } from "react";

export default function SearchBox() {
  const [userInput, setUserInput] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
  };
  return (
    <div className={styles.searchBoxContainer}>
      <div className={styles.searchBoxHolder}>
        <div className={styles.inputContainer}>
          <PrimaryInput
            width="100%"
            type="text"
            placeHolder="Search for a movie"
            name="searchInput"
            value={userInput}
            onChange={handleInputChange}
            leftIcon={
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
            }
            leftIconClick={null}
          />
        </div>
        <div className={styles.searchResultContainer}></div>
      </div>
    </div>
  );
}
