import styles from "./LeftNavBar.module.css";
import { Link } from "react-router";
import {useNavigate} from "react-router"

interface NavItem {
  icon: any;
  text: string;
  link: string;
}

function IconWrapper({ icon }: { icon: any }) {
  return icon;
}

function NavBarItem({ icon, text, link }: NavItem) {
  return (
    <li>
      <Link to={link}>
        <IconWrapper icon={icon} />
        <span>{text}</span>
      </Link>
    </li>
  );
}

export default function LeftNavBar({
  navBarStyle,
}: {
  navBarStyle: "full" | "collaps";
}) {
  const navigate = useNavigate();
  return (
    <nav
      className={`${styles.leftNavBar} ${navBarStyle === "full" ? styles.expandLeftNavBar : ""}`}
    >
      <ul>
        <NavBarItem
          icon={
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
                d="M20.71 18.65v-7.622a3 3 0 0 0-1.151-2.362l-6.326-4.951a2 2 0 0 0-2.466 0l-6.326 4.95a3 3 0 0 0-1.15 2.363v7.622c0 1.16.94 2.1 2.1 2.1h3.97v-7.965h5.278v7.965h3.97a2.1 2.1 0 0 0 2.1-2.1"
              ></path>
            </svg>
          }
          text="home"
          link="/"
        />

        <NavBarItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinejoin="round"
                  d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                ></path>
                <circle cx={12} cy={7} r={3}></circle>
              </g>
            </svg>
          }
          text="Profile"
          link="/profile"
        />
        <li>
          <button onClick={()=>{
            const today = new Date();
            const tomorrow = new Date(today.getTime() - (24 * 60 * 60 * 1000));
            const expirationString = tomorrow.toUTCString();
            document.cookie = `token=; path=/;expires=${expirationString }`;
            window.location.href = "/"
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
              ></path>
            </svg>{" "}
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
