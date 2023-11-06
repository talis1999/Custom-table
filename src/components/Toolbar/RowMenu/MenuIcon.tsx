import React from "react";
import CompressIcon from "@mui/icons-material/CompressOutlined";
import ExpandIcon from "@mui/icons-material/ExpandOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import CancelIcon from "@mui/icons-material/CancelOutlined";

import { RowMenu } from "../../../features/data/constants";

interface MenuIconProps {
  iconType: RowMenu;
}

const MenuIcon: React.FC<MenuIconProps> = ({ iconType }) => {
  if (iconType === RowMenu.Group) return <CompressIcon fontSize="small" />;
  if (iconType === RowMenu.Ungroup) return <ExpandIcon fontSize="small" />;
  if (iconType === RowMenu.Add) return <AddIcon fontSize="small" />;
  if (iconType === RowMenu.Edit) return <EditIcon fontSize="small" />;
  if (iconType === RowMenu.Delete) return <DeleteIcon fontSize="small" />;
  if (iconType === RowMenu.Save) return <SaveIcon fontSize="small" />;
  if (iconType === RowMenu.Cancel) return <CancelIcon fontSize="small" />;
  return null;
};

export default MenuIcon;
