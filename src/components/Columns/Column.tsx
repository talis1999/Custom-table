import React, { memo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowUp from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDown from "@mui/icons-material/ArrowDropDownSharp";

import { COLUMN_DEFAULT_WIDTH } from "../../features/columns/constants";

interface ColumnProps {
  columnId: string;
  title: string;
  isSelected: boolean;
  isAscending: boolean;
  changeSortByColumn: (columnId: string, columnTitle: string) => void;
  width?: number;
}

const Column: React.FC<ColumnProps> = ({
  columnId = "",
  title = "",
  isSelected = false,
  isAscending = true,
  changeSortByColumn,
  width = COLUMN_DEFAULT_WIDTH,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    changeSortByColumn(columnId, title);
  };

  return (
    <Box
      sx={{
        width: `${width}px`,
        px: 1,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2px",
        boxSizing: "border-box",
      }}
    >
      <IconButton
        aria-label="sort"
        sx={{
          color: isSelected ? "#3c3c3c" : "#606060",
        }}
        onClick={handleClick}
      >
        {isAscending ? (
          <ArrowUp fontSize="small" />
        ) : (
          <ArrowDown fontSize="small" />
        )}
      </IconButton>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flex: 1,
          fontWeight: "bold",
          position: "relative",
          top: "1px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default memo(Column);
