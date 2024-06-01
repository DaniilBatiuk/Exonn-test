import { useMediaQuery } from "@siberiacancode/reactuse";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import "./Tabs.scss";
import { HiddenTabs } from "./components/HiddenTabs/HiddenTabs";
import { Pin } from "./components/Pin/Pin";
import { Tab } from "./components/Tab/Tab";
import { useDropDown } from "./hooks/useDropDown";
import { useTabsHook } from "./hooks/useTabsHook";

export const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1000);
  const [selectItemId, setSelectItemId] = useState(0);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const { dropdownPosition, dropdownVisible, handleDropDown, setDropdownVisible } = useDropDown();
  const { pinnedTabList, setPinnedTabList, setUnpinnedTabList, unpinnedTabList } = useTabsHook();

  return (
    <section className="tabs">
      <nav className="tabs__list" id="scrollContainer">
        <ReactSortable
          list={pinnedTabList}
          setList={setPinnedTabList}
          animation={150}
          delay={isSmallDevice ? 2000 : 100}
          className="tabs__inner-list"
          onChoose={() => setDropdownVisible(false)}
          onUnchoose={() => setDropdownVisible(false)}
        >
          {pinnedTabList.map(tab => (
            <Tab
              tab={tab}
              setSelectItemId={setSelectItemId}
              handleDropDown={handleDropDown}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              pinedList={true}
              key={tab.id}
            />
          ))}
        </ReactSortable>

        <ReactSortable
          className="tabs__inner-list"
          list={unpinnedTabList}
          setList={setUnpinnedTabList}
          animation={150}
          delay={isSmallDevice ? 2000 : 100}
          onChoose={() => setDropdownVisible(false)}
          onUnchoose={() => setDropdownVisible(false)}
        >
          {unpinnedTabList.map(tab => (
            <Tab
              tab={tab}
              setSelectItemId={setSelectItemId}
              handleDropDown={handleDropDown}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              key={tab.id}
            />
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
