import type { Route } from "./+types/home";
import PrimaryButton, {
  type PrimaryButtonProps,
} from "~/components/Button/PrimaryButton";
import PrimaryInput from "~/components/Input/PrimaryInput";
import styles from "./home.module.css";
import NavBar from "~/components/NavBar/NavBar";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const test = () => {
    console.log("Okay");
  };

  const [x, setX] = useState(new Array(100).fill("1"));

  return (
    <div className={`${styles.homeContainer}`}>
      {x.map((ele) => {
        return <h1 key={uuidv4()}>hi</h1>;
      })}
    </div>
  );
}
