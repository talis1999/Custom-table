import React from "react";
import Columns from "./Columns/Columns";
import Rows from "./Rows/Rows";
import TablePagination from "./TablePagination";
import { Box } from "@mui/material";

const TableContent: React.FC = () => {
  return (
    <Box sx={{ marginTop: 1 }}>
      <Columns />
      <Rows />
      <TablePagination />
    </Box>
  );
};

export default TableContent;
