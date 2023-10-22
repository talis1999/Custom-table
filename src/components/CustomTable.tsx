import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";

import { setRows } from "../features/data";
import { setColumns } from "../features/columns";
import TableFilters from "./TableFilters";
import TableContent from "./TableContent";
import { Box } from "@mui/material";

import COLUMNS from "../constants/mockData/columns";
import ROWS from "../constants/mockData/data";

const CustomTable: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setColumns(COLUMNS));
    dispatch(setRows(ROWS));
  }, []);

  return (
    <Box sx={{ border: "black 1px dotted", p: 1, my: 2, height: "80%" }}>
      <TableFilters />
      <TableContent />
    </Box>
  );
};

export default CustomTable;
