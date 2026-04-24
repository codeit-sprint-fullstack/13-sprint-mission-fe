import React from "react";

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
