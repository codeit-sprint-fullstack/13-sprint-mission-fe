import React from "react";

import styles from "@/components/common/NoResults/NoResults.module.css";

export default function NoResults({ text }) {
  return <p className={styles.noResults}>{text}</p>;
}
