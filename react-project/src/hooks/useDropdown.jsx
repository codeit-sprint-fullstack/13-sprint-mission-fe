import { useState } from "react";

export default function useDropdown() {
  const [open, setOpen] = useState(false);

  const openDropdown = () => {
    setOpen(true);
  };
  const closeDropdown = () => {
    setOpen(false);
  };
  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  return { open, openDropdown, closeDropdown, toggleDropdown };
}
