import React from "react";
import { Box } from "@mui/material";

import SearchField from "./SearchField";
import ColumnsSelect from "./ColumnsSelect";
import SelectedRowToolBar from "./SelectedRowMenu";

const TableFilters: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box sx={{ flex: 1 }}>
        <SearchField />
      </Box>
      <SelectedRowToolBar />
      <ColumnsSelect />
    </Box>
  );
};

export default TableFilters;
