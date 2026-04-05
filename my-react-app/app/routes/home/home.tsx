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

interface PopularMoviesResponse {
  name?: string;
  production_year?: string;
  cover_image?: string;
  rating?: number;
}

export default function Home() {
  const [trendingVideos, setTrendingVideos] = useState(
    new Array(10).fill(null)
  );
  const [popularMovies, setPopularMovies] = useState<PopularMoviesResponse[]>(
    []
  );
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

  const pushNotification = (type: "error" | "success", msg: string) => {
    addNotification(
      notificationContext,
      {
        notificationId: uuidv4(),
        notificationMessage: msg,
        notificationType: type,
      },
      3000
    );
  };

  useEffect(() => {
    // console.log(import.meta.env.VITE_BACKEND_URL);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/search/popular`)
      .then((res) => {
        if (res.status !== 200) {
          pushNotification(
            "error",
            "Something went wrong. couldn't fetch popular movies"
          );
          return;
        }
        res
          .json()
          .then((jres) => {
            console.log(jres);
            setPopularMovies(jres.results);
          })
          .catch((err) => {
            pushNotification("error", "Couldn't parse the server response");
          });
      })
      .catch((err) => {
        alert("Couldn't react the server");
        pushNotification("error", "Couldn't reach the server");
      });
  }, []);

  // const scrollNext = () => {
  //   scrollBox.current.scrollBy({ left: 50 });
  // };
  // const scrollPrev = () => {
  //   scrollBox.current.scrollBy({ left: -50 });
  // };

  // const scrollTo = (to: number) => {
  //   scrollBox.current.scrollBy({ left: to });
  // };

  // function map(
  //   val: number,
  //   minA: number,
  //   maxA: number,
  //   minB: number,
  //   maxB: number
  // ) {
  //   return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
  // }

  // const mouseEnter = (e: any) => {
  //   // const rect = e.currentTarget.getBoundingClientRect();
  //   // const x = e.clientX - rect.left;
  //   // const y = e.clientY - rect.top;
  //   // let rotateY = map(x, 0, 180, -25, 25);
  //   // let rotateX = map(y, 0, 250, 25, -25);
  //   // // console.log(`Relative position: X=${x}, Y=${y}`);
  //   // console.log(testRef.current);
  //   // testRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  //   // console.log(`Relative position: X=${rotateY}, Y=${rotateX}`);
  // };

  // useEffect(() => {
  //   fetch("http://localhost:8000/search/popular", { method: "GET" }).then(
  //     (res: any) => {
  //       if (res.status === 200) {
  //         res.json().then((jres: any) => {
  //           console.log(jres);
  //         });
  //       }
  //     }
  //   );
  // }, []);

  return (
    <div className={`${styles.homeContainer}`}>
      <Slider />
      <section className={styles.pageSection}>
        <div className={styles.sectionTitle}>
          <h2>Also popular</h2>
          <div className={`${styles.sectionButtons} `}></div>
        </div>
        <div className={styles.alsoPopularContainer}>
          {popularMovies.length === 0 && (
            <div className={styles.moviesLoading}></div>
          )}
          {/* <div className={styles.movieContainer}> */}
          {popularMovies.map((ele) => {
            return (
              <div
                className={styles.movieHolder}
                // onMouseMove={mouseEnter}
                key={uuidv4()}
              >
                <img src={ele.cover_image} alt="" />
                <div className={styles.descriptionContainer}>
                  <p className={styles.movieName}>{ele.name}</p>

                  <p>{ele.production_year}</p>
                </div>
              </div>
            );
          })}

          {/* </div> */}
        </div>
      </section>
      {/* <button onClick={handle}>Click click</button> */}
      {/* {x.map((ele) => {
        return <h1 key={uuidv4()}>hi</h1>;
      })} */}
    </div>
  );
}
