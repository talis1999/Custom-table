import React from "react";
import { Box } from "@mui/material";

import SearchField from "./SearchField";
import ColumnsSelect from "./ColumnsSelect";
import SelectedRowMenu from "./RowMenu/SelectedRowMenu";

const TableToolbar: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        border: "solid 1px lightGray",
        borderBottom: "hidden",
        px: 1,
        pt: 1.5,
        pb: 1.75,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <SearchField />
      </Box>
      <SelectedRowMenu />
      <ColumnsSelect />
    </Box>
  );
};

export default TableToolbar;
