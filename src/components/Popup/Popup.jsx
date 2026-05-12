import React from "react";
import { Button } from "@/components";
import styles from "./Popup.module.css";

export default function Popup({ text, disabled }) {
  return (
    <div className={`${styles.popupContainer} ${disabled && styles.disabled}`}>
      <div className={styles.popup}>
        {text}
        <Button variant="rectangle" disabled={false}>
          확인
        </Button>
      </div>
    </div>
  );
}
