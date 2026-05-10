import { useState } from "react";
import dropdown from "../../assets/icon/ic_arrow_down.svg";
import "./Dropdown.css";
export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  if (!isOpen) {
    return (
      <div>
        <button className="dropdown" onClick={() => setIsOpen(!isOpen)}>
          최신순
          <img src={dropdown} alt="아래 화살표" />
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button className="dropdown" onClick={() => setIsOpen(!isOpen)}>
          최신순
          <img src={dropdown} alt="아래 화살표" />
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="open">
          좋아요순
        </button>
      </div>
    );
  }
}
