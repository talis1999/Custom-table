import React from "react";
import { Box } from "@mui/material";

import SearchField from "./SearchField";

const TableFilters: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <SearchField />
    </Box>
  );
};

export default TableFilters;
