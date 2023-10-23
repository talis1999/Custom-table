import React from "react";
import { Box } from "@mui/material";

import PageSizeSelect from "./PageSizeSelect";
import PageIndexControl from "./PageIndexControl";

const TablePagination: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#66788c",
        color: "#F5F7F8",
        px: 3,
        py: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <PageSizeSelect />
      </Box>
      <PageIndexControl />
    </Box>
  );
};

export default TablePagination;
