import type { Route } from "./+types/home";
import PrimaryButton, {
  type PrimaryButtonProps,
} from "~/components/Button/PrimaryButton";
import PrimaryInput from "~/components/Input/PrimaryInput";
import styles from "./home.module.css";
import NavBar from "~/components/NavBar/NavBar";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import NotificationContext, {
  addNotification,
} from "~/context/Notification/NotificationContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const notificationContext = useContext(NotificationContext);
  const test = () => {
    console.log("Okay");
  };

  const [x, setX] = useState(new Array(100).fill("1"));

  const handle = () => {
    console.log("fuck");

    addNotification(
      notificationContext,
      {
        notificationId: uuidv4(),
        notificationMessage: "fuffufuck",
        notificationType: "error",
      },
      3000
    );
  };

  return (
    <div className={`${styles.homeContainer}`}>
      <button onClick={handle}>Click click</button>
      {x.map((ele) => {
        return <h1 key={uuidv4()}>hi</h1>;
      })}
    </div>
  );
}
