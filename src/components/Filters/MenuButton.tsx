import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { blue, red } from "@mui/material/colors";

import MenuIcon from "./MenuIcon";

import { RowMenu } from "../../features/data/constants";

interface MenuButtonProps {
  buttonType: RowMenu;
  isEnabled: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  buttonType,
  isEnabled = false,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonType === RowMenu.Group) {
    }
    if (buttonType === RowMenu.Ungroup) {
    }
    if (buttonType === RowMenu.Add) {
    }
    if (buttonType === RowMenu.Edit) {
    }
    if (buttonType === RowMenu.Delete) {
    }
    if (buttonType === RowMenu.Save) {
    }
    if (buttonType === RowMenu.Cancel) {
    }
  };
  return (
    <Tooltip title={buttonType}>
      <IconButton
        aria-label={buttonType}
        onClick={handleClick}
        disabled={!isEnabled}
        sx={{
          ":hover": {
            color: buttonType === RowMenu.Cancel ? red[300] : blue[200],
          },
        }}
      >
        <MenuIcon iconType={buttonType} />
      </IconButton>
    </Tooltip>
  );
};

export default MenuButton;
