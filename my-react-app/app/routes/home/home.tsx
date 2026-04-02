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
import { useRef, useEffect } from "react";
import Slider from "~/components/Slider/Slider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [trendingVideos, setTrendingVideos] = useState(
    new Array(10).fill(null)
  );
  const scrollBox = useRef<any>(null);
  const notificationContext = useContext(NotificationContext);

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

  const scrollNext = () => {
    scrollBox.current.scrollBy({ left: 50 });
  };
  const scrollPrev = () => {
    scrollBox.current.scrollBy({ left: -50 });
  };

  const scrollTo = (to: number) => {
    scrollBox.current.scrollBy({ left: to });
  };

  return (
    <div className={`${styles.homeContainer}`}>
      <Slider />
      <h1>hi</h1>
      {/* <button onClick={handle}>Click click</button> */}
      {/* {x.map((ele) => {
        return <h1 key={uuidv4()}>hi</h1>;
      })} */}
    </div>
  );
}
