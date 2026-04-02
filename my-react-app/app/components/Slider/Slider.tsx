import styles from "./Slider.module.css";
import { useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const items = new Array(10).fill(null);

export default function Slider() {
  // const [items, setItems] = useState<any>(new Array(10).fill(null));
  const scrollBox = useRef<any>(null);
  console.log(items.length);

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.sliderHolder}
        style={{
          width: `calc(${items.length} * 100%)`,
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        }}
      >
        {items.map((ele: any, idx: any) => {
          return (
            <div key={idx} className={styles.sliderItem}>
              <h1>hi</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
