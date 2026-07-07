import styles from "./watch.module.css";
import { useParams } from "react-router";

const Watch = () => {
  let { identifier } = useParams();
  return (
    <div className={styles.watchPage}>
      <div className={styles.videoBox}>
        <video
          src={`http://localhost:8000/stream/watch?identifier=${identifier}`}
          controls
        ></video>
      </div>
    </div>
  );
};

export default Watch;
