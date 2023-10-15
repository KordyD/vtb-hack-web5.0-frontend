export interface ExpandFilterAction {
  isBanks: boolean;
  menuItemKey: number;
}

export interface ChooseServiceAction {
  isBanks: boolean;
  itemName: string;
  subItemName?: string;
  chosen: boolean;
}
