import React from "react";

import styles from "@/components/NoResults.module.css";

export default function NoResults({ text }) {
  return <p className={styles.noResults}>{text}</p>;
}
