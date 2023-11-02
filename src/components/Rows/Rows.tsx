import React from "react";
import { Box } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import { selectPaginatedRows } from "../../features/data/data";

import Row from "./Row";

const Rows: React.FC = () => {
  const rows = useAppSelector(selectPaginatedRows);
  console.log("!-- ROW RENDER --!");

  return (
    <Box
      sx={{
        height: "50vh",
        overflowY: "auto",
        backgroundColor: "#a5b1c2",
      }}
    >
      {Boolean(rows.length) &&
        rows.map((row) => <Row key={`row-${row.id}`} row={row} />)}
    </Box>
  );
};

export default Rows;
