export const PAGE_SIZES: number[] = [5, 10, 25, 50, 100];

export enum RowMenu {
  Group = "group",
  Ungroup = "ungroup",
  Add = "add",
  Edit = "edit",
  Delete = "delete",
  Save = "save",
  Cencel = "cancel",
}

export const LEFT_MENU_BUTTONS: RowMenu[] = [
  RowMenu.Group,
  RowMenu.Ungroup,
  RowMenu.Add,
  RowMenu.Edit,
  RowMenu.Delete,
];

export const RIGHT_MENU_BUTTONS: RowMenu[] = [RowMenu.Save, RowMenu.Cencel];
