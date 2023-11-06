import React from "react";
import { Box } from "@mui/material";

import { useAppSelector } from "../app/hooks";
import { selectColumnsWidth } from "../features/columns/columns";

import Columns from "./Columns/Columns";
import Rows from "./Rows/Rows";

const TableContent: React.FC = () => {
  const columnWidth: number = useAppSelector(selectColumnsWidth);
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box
        sx={{
          minWidth: `${columnWidth}px`,
        }}
      >
        <Columns />
        <Rows />
      </Box>
    </Box>
  );
};

export default TableContent;
