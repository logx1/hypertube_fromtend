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

  // const [x, setX] = useState(new Array(100).fill("1"));

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
      <div className={styles.trendingVideos}>
        <button
          className={`${styles.trendingVideosNavigator} ${styles.nextBtn}`}
          onClick={scrollNext}
        >
          next
        </button>
        <button
          className={`${styles.trendingVideosNavigator} ${styles.prevBtn}`}
          onClick={scrollPrev}
        >
          prev
        </button>
        <div className={styles.trendingVideosTracker}>
          {trendingVideos.map((ele, idx) => {
            return (
              <button
                className={styles.itemTracker}
                key={uuidv4()}
                onClick={() => {
                  console.log(idx * 10);
                  scrollTo(idx * 10);
                }}
              ></button>
            );
          })}
        </div>
        <div ref={scrollBox} className={styles.trendingVideosContainer}>
          <div
            className={styles.videosWrapper}
            style={{
              width: trendingVideos.length * 100 + "%",
              gridTemplateColumns: `repeat(${trendingVideos.length}, 1fr)`,
            }}
          >
            {trendingVideos.map((ele, idx) => {
              return (
                <div className={styles.videoContainer} key={uuidv4()}>
                  <p className={styles.videoTitle}>Beyond The horizon</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <h1>hi</h1>
      {/* <button onClick={handle}>Click click</button> */}
      {/* {x.map((ele) => {
        return <h1 key={uuidv4()}>hi</h1>;
      })} */}
    </div>
  );
}
