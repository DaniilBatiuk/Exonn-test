import { useMediaQuery } from "@siberiacancode/reactuse";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";

import "./Tabs.scss";
import { HiddenTabs } from "./components/HiddenTabs/HiddenTabs";
import { Pin } from "./components/Pin/Pin";
import { iconSelect } from "./helpers/iconSelect";
import { useDropDown } from "./hooks/useDropDown";
import { useTabsHook } from "./hooks/useTabsHook";

export const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1000);
  const [selectItemId, setSelectItemId] = useState(0);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const { dropdownPosition, dropdownVisible, handleTabClick } = useDropDown();
  const { pinnedTabList, setPinnedTabList, setUnpinnedTabList, unpinnedTabList } = useTabsHook();

  return (
    <section className="tabs">
      <nav className="tabs__list" id="scrollContainer">
        <ReactSortable
          list={pinnedTabList}
          setList={setPinnedTabList}
          animation={150}
          filter=".filtered"
          delay={isSmallDevice ? 2000 : 100}
          className="tabs__inner-list"
        >
          {pinnedTabList.map(tab => (
            <Link
              to={tab.text}
              key={tab.id}
              className={clsx("tabs__list-item border-gray", {
                active: activeTab === tab.id,
              })}
              onClick={() => setActiveTab(tab.id)}
              onContextMenu={event => {
                setSelectItemId(tab.id), handleTabClick(event);
              }}
            >
              {iconSelect(tab.id)}
            </Link>
          ))}
        </ReactSortable>

        <ReactSortable
          className="tabs__inner-list"
          list={unpinnedTabList}
          setList={setUnpinnedTabList}
          animation={150}
          filter=".filtered"
          delay={isSmallDevice ? 2000 : 100}
        >
          {unpinnedTabList.map(tab => (
            <Link
              to={tab.text}
              key={tab.id}
              className={clsx("tabs__list-item", {
                active: activeTab === tab.id,
              })}
              onClick={() => setActiveTab(tab.id)}
              onContextMenu={event => {
                setSelectItemId(tab.id), handleTabClick(event);
              }}
            >
              {iconSelect(tab.id)}
              {tab.text && <span>{tab.text}</span>}
            </Link>
          ))}
        </ReactSortable>
      </nav>
      <HiddenTabs pinnedTabList={pinnedTabList} unpinnedTabList={unpinnedTabList} />
      {dropdownVisible && (
        <Pin
          setPinnedTabList={setPinnedTabList}
          setUnpinnedTabList={setUnpinnedTabList}
          unpinnedTabList={unpinnedTabList}
          pinnedTabList={pinnedTabList}
          selectItemId={selectItemId}
          dropdownPosition={dropdownPosition}
        />
      )}
    </section>
  );
};
