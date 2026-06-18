import type { Route } from "./+types/movieInfos";

import styles from "./movieInfos.module.css";
import { useParams } from "react-router";
import { useEffect, useContext, useState } from "react";
import NotificationContext, {
  addNotification,
} from "~/context/Notification/NotificationContext";
import { v4 as uuid } from "uuid";
import { getCookie } from "~/tools/getCookie";
import { redirect } from "react-router";



export async function clientLoader({ params }: Route.ClientLoaderArgs) {

  const authToken: string | undefined = getCookie(document.cookie, "token");
    if (!authToken)
      {
        return redirect("/login");
      }
  
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/search/movie_detail?id=${params.movieId}`,{
      method:"GET",
      headers:{
        "Authorization": `Bearer ${authToken}`
      }
    }
  );
  const product = await res.json();
  console.log(product);
  return product;
}

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function movieInfos({ loaderData }: Route.ComponentProps) {
  let { movieId, movieName } = useParams();
  const [movieInfos, setMovieInfos] = useState<any>({});
  const notificationContext = useContext(NotificationContext);
  const data = loaderData;

  return (
    <div className={styles.moviesInfoContainer}>
      <div className={styles.movieCover}>
        <img src={data.backdrop_image || data.cover_image} alt="" />
      </div>
      <div className={styles.titleContainer}>
        <h1>
          {data.name}
        </h1>
        <div className={styles.genresContainer}>
          {data.genres.map((ele: any) => {
            return <span key={uuid()}>{ele}</span>;
          })}
          <span className={styles.releaseDate}>{data.release_date}</span>
        </div>
      </div>
      <p>{data.overview}</p>
      <h2 className={styles.actorsTitle}>Actors</h2>
      <div className={styles.actorsContainer}>
        {data.actors.map((ele: any) => {
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
