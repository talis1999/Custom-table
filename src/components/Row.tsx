import React from "react";
import { Paper } from "@mui/material";

import { useAppSelector } from "../app/hooks";
import { Row as RowType } from "../features/data";
import { selectColumns } from "../features/columns";
import Cell from "./Cell";

interface RowProps {
  row: RowType;
}

const Row: React.FC<RowProps> = ({ row }) => {
  const columns = useAppSelector(selectColumns);

  return (
    <Paper
      id={`row-${row.id}`}
      variant="outlined"
      square
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        px: 3,
        py: 2,
        my: "2px",
        backgroundColor: "#F5F7F8",
        color: "#71797E",
      }}
    >
      {columns.map((column) => (
        <Cell data={row[column.id]} type={column.type} width={column.width} />
      ))}
    </Paper>
  );
};

export default Row;
