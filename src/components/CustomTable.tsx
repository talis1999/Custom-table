import React, { useEffect } from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";

import { useAppDispatch } from "../app/hooks";
import { setRows } from "../features/data/data";
import { setColumns } from "../features/columns/columns";

import TableToolbar from "./Toolbar/TableToolbar";
import TableContent from "./TableContent";
import TablePagination from "./Pagination/TablePagination";

import COLUMNS from "../constants/mockData/columns";
import ROWS from "../constants/mockData/data";

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

const CustomTable: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setColumns(COLUMNS));
    dispatch(setRows(ROWS));
  }, []);

  return (
    <Box sx={{ border: "black 1px dotted", p: 1.5, my: 3 }}>
      <TableToolbar />
      <ThemeProvider theme={theme}>
        <TableContent />
        <TablePagination />
      </ThemeProvider>
    </Box>
  );
};

export default CustomTable;
