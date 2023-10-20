import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";

import { setRows } from "../features/data";
import { setColumns } from "../features/columns";
import TableFilters from "./TableFilters";
import TableContent from "./TableContent";
import { Box } from "@mui/material";

const CustomTable: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setRows([
        { id: "aaa", "001": "123", "002": "Alex", "003": 25, "004": false },
        { id: "bbb", "001": "123", "002": "Colin", "003": 27, "004": true },
        { id: "ccc0", "001": "123", "002": "Marry", "003": 29, "004": false },
        { id: "ccc1", "001": "123", "002": "Marry", "003": 29, "004": false },
        { id: "ccc2", "001": "123", "002": "Marry", "003": 29, "004": false },
        { id: "ccc3", "001": "123", "002": "Marry", "003": 29, "004": false },
        { id: "ccc4", "001": "123", "002": "Marry", "003": 29, "004": false },
        { id: "ccc5", "001": "123", "002": "Marry", "003": 29, "004": false },
        { id: "ccc6", "001": "123", "002": "Marry", "003": 29, "004": false },
        { id: "ccc7", "001": "123", "002": "Marry", "003": 29, "004": false },
        { id: "ccc8", "001": "123", "002": "Marry", "003": 29, "004": false },
      ])
    );
    dispatch(
      setColumns([
        {
          id: "001",
          ordinalNo: 0,
          title: "Id",
          type: "string",
          width: 100,
        },
        {
          id: "002",
          ordinalNo: 1,
          title: "Name",
          type: "string",
          width: 100,
        },
        {
          id: "003",
          ordinalNo: 2,
          title: "Age",
          type: "Number",
          //width: 150,
        },
        {
          id: "004",
          ordinalNo: 2,
          title: "In debt",
          type: "Boolian",
          width: 100,
        },
      ])
    );
  }, []);

  return (
    <Box sx={{ border: "black 1px dotted", p: 1, my: 2, height: "80%" }}>
      <TableFilters />
      <TableContent />
    </Box>
  );
};

export default CustomTable;
