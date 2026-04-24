import React from "react";
import Button from "./Button";

const SectionTitle = ({ title = "title", children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default SectionTitle;
