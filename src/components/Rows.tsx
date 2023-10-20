import React from "react";
import { Box } from "@mui/material";

import { useAppSelector } from "../app/hooks";
import { selectRows } from "../features/data";

import Row from "./Row";

const Rows: React.FC = () => {
  const rows = useAppSelector(selectRows);

  return (
    <Box
      sx={{
        my: 1,
        height: "50vh",
        overflowY: "auto",
        backgroundColor: "#a5b1c2",
      }}
    >
      {Boolean(rows.length) && rows.map((row) => <Row row={row} />)}
    </Box>
  );
};

export default Rows;
