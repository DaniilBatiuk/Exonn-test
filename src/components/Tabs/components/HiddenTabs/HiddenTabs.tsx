import { useWindowSize } from "@siberiacancode/reactuse";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ICONS } from "../../../../utils/index";
import { dropdownMenuClose } from "../../../Layout/helpers/dropdownMenuClick";
import { iconSelect } from "../../helpers/iconSelect";
import { isElementInViewportHorizontally } from "../../helpers/isElementInViewportHorizontally";

import "./HiddenTabs.scss";

type HiddenTabsProp = {
  pinnedTabList: TabList[];
  unpinnedTabList: TabList[];
};

export const HiddenTabs: React.FC<HiddenTabsProp> = ({
  pinnedTabList,
  unpinnedTabList,
}: HiddenTabsProp) => {
  const [isVisible, setIsVisible] = useState(false);
  const [notVisibleTabs, setNotVisibleTabs] = useState<TabList[]>([]);

  const size = useWindowSize();

  useEffect(() => {
    const elements = document.querySelectorAll(".tabs__inner-list > .tabs__list-item");
    if (!isElementInViewportHorizontally(elements[elements.length - 1])) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [size.width]);

  useEffect(() => {
    const elements = document.querySelectorAll(".tabs__inner-list > .tabs__list-item");
    const notVisibleArrayText: string[] = [];
    elements.forEach(element => {
      if (!isElementInViewportHorizontally(element)) {
        notVisibleArrayText.push(element.textContent ?? "");
      }
    });

    setNotVisibleTabs(
      [...pinnedTabList, ...unpinnedTabList].filter(el => notVisibleArrayText.includes(el.text)),
    );
  }, [size.width, pinnedTabList]);

  return (
    <div
      className={clsx("dropdown", {
        ["dropdown-not-visible"]: !isVisible,
      })}
      tabIndex={0}
      data-dropdown
    >
      <button className="tabs__list-item link" data-dropdown-button>
        {ICONS.arrowTop({ "data-dropdown-button": true })}
      </button>
      <div className="dropdown-menu">
        <div className="dropdown-menu__list">
          {notVisibleTabs.map(tab => (
            <Link
              to={tab.text}
              className="dropdown-menu__list-item"
              key={tab.id}
              onClick={() => dropdownMenuClose()}
            >
              <div>
                {iconSelect(tab.id)} <span>{tab.text}</span>
              </div>
              {ICONS.close({ className: "dropdown-menu__close" })}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
