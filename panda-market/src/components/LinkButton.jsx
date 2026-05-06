import React from "react";

export default function LinkButton({ href, children = "button" }) {
  return (
    <a href={href} className="linkbutton">
      {children}
    </a>
  );
}
