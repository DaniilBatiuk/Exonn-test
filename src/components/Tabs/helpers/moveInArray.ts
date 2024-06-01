export const moveInArray = <T extends { id: number }>(
  id: number,
  fromList: Array<T>,
  setFromList: React.Dispatch<React.SetStateAction<T[]>>,
  setToList: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  const selectedItem = fromList.find(el => el.id === id);
  if (!selectedItem) return;

  setFromList(prev => prev.filter(el => el.id !== id));
  setToList(prev => [...prev, selectedItem]);
};
