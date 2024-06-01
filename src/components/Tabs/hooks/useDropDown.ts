import { useEffect, useState } from "react";

export const useDropDown = () => {
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleTabClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setDropdownVisible(true);
    setDropdownPosition({
      x: window.innerWidth - event.clientX - 165 < 0 ? window.innerWidth - 165 : event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("click", () => setDropdownVisible(false));
    } else {
      document.removeEventListener("click", () => setDropdownVisible(false));
    }
  }, [dropdownVisible]);

  return { dropdownPosition, dropdownVisible, handleTabClick };
};
