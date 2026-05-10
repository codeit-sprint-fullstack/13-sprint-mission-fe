import React, { Children } from "react";
import styles from "../../css/FormRegistration.module.css";

const FormAlertText = ({ children }) => {
  return <p className={`${styles.alertText} text-md-semibold`}>{children}</p>;
};

export default FormAlertText;
