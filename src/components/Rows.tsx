import React from "react";
import { Box, Paper } from "@mui/material";

import { useAppSelector } from "../app/hooks";
import { selectRows } from "../features/data";

import Row from "./Row";

const Rows: React.FC = () => {
  const rows = useAppSelector(selectRows);

  return (
    <Box sx={{ my: 1, height: "50vh", overflowY: "auto" }}>
      {Boolean(rows.length) && rows.map((row) => <Row row={row} />)}
    </Box>
  );
};

export default Rows;
