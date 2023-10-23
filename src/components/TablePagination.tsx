import React from "react";
import { Box, Select, MenuItem, FormControl } from "@mui/material";

import PageSizeSelect from "./PageSizeSelect";

const TablePagination: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#66788c", color: "#F5F7F8", px: 3, py: 1 }}>
      <PageSizeSelect />
    </Box>
  );
};

export default TablePagination;
