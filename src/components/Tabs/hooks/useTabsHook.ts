import { useEffect, useLayoutEffect, useState } from "react";

import { PINNED_TAB_LIST, UNPINNED_TAB_LIST } from "../constants";

import { useCookie } from "./useCookie";

export const useTabsHook = () => {
  const [cookieTabListPinned, updateCookieTabListPinned] = useCookie(
    "PINNED_TAB_LIST",
    PINNED_TAB_LIST,
  );
  const [cookieTabListUnpinned, updateCookieTabListUnpinned] = useCookie(
    "UNPINNED_TAB_LIST",
    UNPINNED_TAB_LIST,
  );

  const [pinnedTabList, setPinnedTabList] = useState(PINNED_TAB_LIST);
  const [unpinnedTabList, setUnpinnedTabList] = useState(UNPINNED_TAB_LIST);

  useLayoutEffect(() => {
    updateCookieTabListPinned(PINNED_TAB_LIST);
    updateCookieTabListUnpinned(UNPINNED_TAB_LIST);
    setPinnedTabList(cookieTabListPinned);
    setUnpinnedTabList(cookieTabListUnpinned);
  }, []);

  useEffect(() => {
    updateCookieTabListPinned(pinnedTabList);
  }, [pinnedTabList]);

  useEffect(() => {
    updateCookieTabListUnpinned(unpinnedTabList);
  }, [unpinnedTabList]);

  useEffect(() => {
    const scrollContainer = document.getElementById("scrollContainer") as HTMLDivElement;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", e => {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      });
    }
  }, []);

  return { pinnedTabList, setPinnedTabList, setUnpinnedTabList, unpinnedTabList };
};
