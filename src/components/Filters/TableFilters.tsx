import React from "react";
import { Box } from "@mui/material";

import SearchField from "./SearchField";
import ColumnsSelect from "./ColumnsSelect";

const TableFilters: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ flex: 1 }}>
        <SearchField />
      </Box>
      <ColumnsSelect />
    </Box>
  );
};

export default TableFilters;
