export const isElementInViewportHorizontally = (element: Element) => {
  const rect = element.getBoundingClientRect();
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const elementWidth = rect.width;
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);

  return visibleWidth >= elementWidth * 0.7;
};
