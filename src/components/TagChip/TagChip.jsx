import React from "react";
import { icX } from "@/assets/icons";
import styles from "./TagChip.module.css";

export default function TagChip({ text, ...props }) {
  return (
    <div className={styles.container}>
      <p>#{text}</p>
      <img src={icX} {...props} />
    </div>
  );
}
