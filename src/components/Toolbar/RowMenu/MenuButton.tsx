import React, { memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { blue, red } from "@mui/material/colors";

import MenuIcon from "./MenuIcon";

import { useAppDispatch } from "../../../app/hooks";
import {
  setSelectedRow,
  unsetSelectedRow,
  addGroupValue,
  removeGroupValue,
  deleteSelectedRow,
  saveSelectedRow,
} from "../../../features/data/data";
import { RowMenu } from "../../../features/data/constants";

interface MenuButtonProps {
  buttonType: RowMenu;
  isEnabled: boolean;
  columnId?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  buttonType,
  isEnabled = false,
  columnId = "",
}) => {
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonType === RowMenu.Group && Boolean(columnId)) {
      dispatch(addGroupValue(columnId));
    }
    if (buttonType === RowMenu.Ungroup && Boolean(columnId)) {
      dispatch(removeGroupValue(columnId));
    }
    if (buttonType === RowMenu.Add) {
      dispatch(setSelectedRow({ upsertModeActive: true }));
    }
    if (buttonType === RowMenu.Edit) {
      dispatch(setSelectedRow({ upsertModeActive: true }));
    }
    if (buttonType === RowMenu.Delete) {
      dispatch(deleteSelectedRow());
    }
    if (buttonType === RowMenu.Save) {
      dispatch(saveSelectedRow());
      dispatch(unsetSelectedRow());
    }
    if (buttonType === RowMenu.Cancel) {
      dispatch(unsetSelectedRow());
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
