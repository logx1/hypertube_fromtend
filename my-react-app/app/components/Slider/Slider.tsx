import styles from "./Slider.module.css";
import { useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Slider() {
  const [items, setItems] = useState<any>(new Array(10).fill(null));
  const scrollBox = useRef<any>(null);
  console.log(items.length);

  return <div></div>;
}
