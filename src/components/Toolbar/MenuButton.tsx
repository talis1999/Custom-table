import React, { memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { blue, red } from "@mui/material/colors";

import MenuIcon from "./MenuIcon";

import { useAppDispatch } from "../../app/hooks";
import { setSelectedRow } from "../../features/data/data";
import { RowMenu } from "../../features/data/constants";

interface MenuButtonProps {
  buttonType: RowMenu;
  isEnabled: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  buttonType,
  isEnabled = false,
}) => {
  const dispatch = useAppDispatch();
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
      dispatch(
        setSelectedRow({ rowId: "", groupValue: "", upsertModeActive: false })
      );
    }
  };

  return (
    <Tooltip title={buttonType}>
      <span>
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
      </span>
    </Tooltip>
  );
};

export default memo(MenuButton);
