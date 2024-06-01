import { ICONS } from "../../../utils/constants/icons";

export const iconSelect = (id: number) => {
  switch (id) {
    case 0:
      return ICONS.lagerverwaltung();
    case 1:
      return ICONS.dashboard();
    case 2:
      return ICONS.banking();
    case 3:
      return ICONS.telefonie();
    case 4:
      return ICONS.verkauf();
    case 5:
      return ICONS.statistik();
    case 6:
      return ICONS.postOffice();
    case 7:
      return ICONS.administration();
    case 8:
      return ICONS.help();
    case 9:
      return ICONS.warenbestand();
    case 10:
      return ICONS.auswahllisten();
    case 11:
      return ICONS.einkauf();
    default:
      return ICONS.rechn();
  }
};
