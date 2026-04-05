import type { Route } from "./+types/movieInfos";

import styles from "./movieInfos.module.css";
import { useParams } from "react-router";
import { useEffect, useContext, useState } from "react";
import NotificationContext, {
  addNotification,
} from "~/context/Notification/NotificationContext";
import { v4 as uuid } from "uuid";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  // console.log(params.movieId);
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/search/movie_detail?id=${params.movieId}`
  );
  const product = await res.json();
  console.log(product);
  return product;
}

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

export default function movieInfos({ loaderData }: Route.ComponentProps) {
  let { movieId, movieName } = useParams();
  const [movieInfos, setMovieInfos] = useState<any>({});
  const notificationContext = useContext(NotificationContext);
  const { name, genres, overview, actors, release_date, cover_image } =
    loaderData;

  // useEffect(() => {
  //   fetch(
  //     `${import.meta.env.VITE_BACKEND_URL}/search/movie_detail?id=${movieId}`,
  //     { method: "GET" }
  //   )
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         addNotification(
  //           notificationContext,
  //           {
  //             notificationId: uuid(),
  //             notificationMessage: "Something went wrong",
  //             notificationType: "error",
  //           },
  //           3000
  //         );
  //         return;
  //       }
  //       res
  //         .json()
  //         .then((res) => {
  //           console.log(res);
  //           setMovieInfos(res);
  //         })
  //         .catch((err) => {
  //           addNotification(
  //             notificationContext,
  //             {
  //               notificationId: uuid(),
  //               notificationMessage: "Couldn't parse the response",
  //               notificationType: "error",
  //             },
  //             3000
  //           );
  //         });
  //     })
  //     .catch((err) => {
  //       addNotification(
  //         notificationContext,
  //         {
  //           notificationId: uuid(),
  //           notificationMessage: "Couldn't reach server",
  //           notificationType: "error",
  //         },
  //         300
  //       );
  //     });
  // }, [movieId]);

  return (
    <div className={styles.moviesInfoContainer}>
      <div className={styles.movieCover}>
        <img src={cover_image} alt="" />
      </div>
      <div className={styles.titleContainer}>
        <h1>
          {name} <span className={styles.releaseDate}>{release_date}</span>
        </h1>
        <div className={styles.genresContainer}>
          {genres.map((ele: any) => {
            return <span key={uuid()}>Science Fiction</span>;
          })}
        </div>
      </div>
      <p>{overview}</p>
      <h2>Actors</h2>
      <div className={styles.actorsContainer}>
        {actors.map((ele: any) => {
          return (
            <div className={styles.actorContainer} key={uuid()}>
              <img src={ele.profile_image} alt="" />
              <p>{ele.name}</p>
              <p>{ele.character}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// {
//   "movie_id": 1225215,
//   "name": "Proje Ladik: Extended Cut",
//   "production_year": "2023",
//   "rating": 0,
//   "cover_image": "https://image.tmdb.org/t/p/w1280/dcYjdbB4On5FVHhIATS7SLg3NCb.jpg",
//   "overview": "An ex special agent is settled in a small village called \"Ladik\" for his retirement. One day in here he gets a call from his old partner. He is not safe here anymore. Now, he has to face his past and meet with his new enemies."
// }
