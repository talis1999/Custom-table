import React from "react";
import Columns from "./Columns/Columns";
import Rows from "./Rows/Rows";
import TablePagination from "./TablePagination";
import { Box, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      paper: "#778ca3",
    },
    text: {
      primary: "#F5F7F8",
    },
  },
});

const TableContent: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ marginTop: 1 }}>
        <Columns />
        <Rows />
        <TablePagination />
      </Box>
    </ThemeProvider>
  );
};

export default TableContent;
