import { toast } from "react-toastify";

import { ICONS } from "../../../../utils/index";
import { moveFromOneArrayToAnother } from "../../helpers/moveInArray";

import "./Pin.scss";

type DropdownPosition = {
  x: number;
  y: number;
};

type PinProp = {
  pinnedTabList: TabList[];
  selectItemId: number;
  unpinnedTabList: TabList[];
  dropdownPosition: DropdownPosition;
  setPinnedTabList: React.Dispatch<React.SetStateAction<TabList[]>>;
  setUnpinnedTabList: React.Dispatch<React.SetStateAction<TabList[]>>;
};

export const Pin: React.FC<PinProp> = ({
  pinnedTabList,
  selectItemId,
  unpinnedTabList,
  dropdownPosition,
  setPinnedTabList,
  setUnpinnedTabList,
}: PinProp) => {
  return (
    <div
      className="pin"
      style={{
        position: "absolute",
        top: dropdownPosition.y + 10,
        left: dropdownPosition.x,
        zIndex: 1,
      }}
      onClick={() =>
        pinnedTabList.find(el => el.id === selectItemId)
          ? moveFromOneArrayToAnother(
              selectItemId,
              pinnedTabList,
              setPinnedTabList,
              setUnpinnedTabList,
            )
          : pinnedTabList.length >= 3
            ? toast.error("You can not pin more then 3 tabs!")
            : moveFromOneArrayToAnother(
                selectItemId,
                unpinnedTabList,
                setUnpinnedTabList,
                setPinnedTabList,
              )
      }
    >
      {ICONS.pin()}
      <span>{pinnedTabList.find(el => el.id === selectItemId) ? "Tab lösen" : "Tab anpinnen"}</span>
    </div>
  );
};
