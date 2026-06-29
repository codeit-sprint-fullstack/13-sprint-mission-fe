import React from "react";
import { Input } from "@/components";
import styles from "./InputBlock.module.css";

export default function InputBlock({
  title,
  errorMsg,
  multiline = false,
  className,
  ...inputProps
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <Input {...inputProps} multiline={multiline} className={className} />
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
}
