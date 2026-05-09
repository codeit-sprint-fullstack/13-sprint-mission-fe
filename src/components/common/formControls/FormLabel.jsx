import React from "react";

import styles from "./FormLabel.module.css";

export default function FormLabel({ label }) {
  return <p className={styles.label}>{label}</p>;
}
