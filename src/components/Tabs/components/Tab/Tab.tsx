import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../Tabs.scss";
import { iconSelect } from "../../helpers/iconSelect";

type TabProp = {
  tab: TabList;
  setSelectItemId: React.Dispatch<React.SetStateAction<number>>;
  handleDropDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent) => void;
  pinedList?: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
};

export const Tab: React.FC<TabProp> = ({
  tab,
  setSelectItemId,
  handleDropDown,
  pinedList = false,
  setActiveTab,
  activeTab,
}: TabProp) => {
  const [timer, setTimer] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleClick = () => {
    setActiveTab(tab.id);
    navigate(`${tab.text}`);
  };

  const handleDropDownEvent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabId: number,
  ) => {
    setSelectItemId(tabId);
    handleDropDown(event);
  };

  const handleTouchStart = (event: React.TouchEvent, tabId: number) => {
    const newTimer = setTimeout(() => {
      setSelectItemId(tabId);
      handleDropDown(event);
    }, 1000);

    setTimer(newTimer);
  };

  const handleTouchEnd = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  return (
    <div
      className={clsx("tabs__list-item", {
        active: activeTab === tab.id,
        "border-gray": pinedList,
      })}
      onClick={handleClick}
      onContextMenu={e => handleDropDownEvent(e, tab.id)}
      onTouchStart={e => handleTouchStart(e, tab.id)}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {iconSelect(tab.id)}
      {!pinedList && tab.text && <span>{tab.text}</span>}
    </div>
  );
};
