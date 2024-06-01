export const hasHorizontalScroll = (element: Element | null) => {
  if (!element) return;
  return element.scrollWidth > element.clientWidth;
};
