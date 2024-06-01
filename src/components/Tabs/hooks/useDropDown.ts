import { useEffect, useState } from "react";

export const isTouchEvent = (
  event: React.MouseEvent | React.TouchEvent,
): event is React.TouchEvent => {
  return "touches" in event;
};
export const useDropDown = () => {
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  let isTouch: null | boolean = null;

  const handleDropDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent,
  ) => {
    event.preventDefault();
    setDropdownVisible(true);
    isTouch = "touches" in event;

    let x, y;
    if (isTouchEvent(event)) {
      const touch = event.changedTouches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      const mouseEvent = event as React.MouseEvent;
      x = mouseEvent.clientX;
      y = mouseEvent.clientY;
    }

    x = Math.max(0, x);

    setDropdownPosition({
      x: window.innerWidth - x - 165 < 0 ? window.innerWidth - 165 : x,
      y: y,
    });
  };

  useEffect(() => {
    if (dropdownVisible) {
      isTouch
        ? document.addEventListener("touchend", () => setDropdownVisible(false))
        : document.addEventListener("click", () => setDropdownVisible(false));
    } else {
      isTouch
        ? document.removeEventListener("touchend", () => setDropdownVisible(false))
        : document.removeEventListener("click", () => setDropdownVisible(false));
    }
  }, [dropdownVisible]);

  return { dropdownPosition, dropdownVisible, handleDropDown, setDropdownVisible };
};
