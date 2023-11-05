import React from "react";
import { Box, Divider } from "@mui/material";
import MenuButton from "./MenuButton";

import { useAppSelector } from "../../app/hooks";
import { SelectedRow, selectSelectedRow } from "../../features/data/data";
import { isRowMenuButtonEnabled } from "../../features/data/utils";
import {
  LEFT_MENU_BUTTONS,
  RIGHT_MENU_BUTTONS,
} from "../../features/data/constants";

const SelectedRowMenu: React.FC = () => {
  const selectedRow: SelectedRow = useAppSelector(selectSelectedRow);

  return (
    <Box
      sx={{
        border: "solid 1px lightGray",
        borderRadius: 5,
        px: 0.5,
        py: "1px",
        display: "flex",
        gap: 0.5,
      }}
    >
      {LEFT_MENU_BUTTONS.map((menuButton) => (
        <MenuButton
          key={`menu-button-${menuButton}`}
          buttonType={menuButton}
          isEnabled={isRowMenuButtonEnabled(selectedRow, menuButton)}
        />
      ))}
      <Divider sx={{ my: "-1px" }} orientation="vertical" flexItem />
      {RIGHT_MENU_BUTTONS.map((menuButton) => (
        <MenuButton
          key={`menu-button-${menuButton}`}
          buttonType={menuButton}
          isEnabled={isRowMenuButtonEnabled(selectedRow, menuButton)}
        />
      ))}
    </Box>
  );
};

export default SelectedRowMenu;
