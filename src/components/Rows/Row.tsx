import React from "react";
import { Paper } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import { Row as RowType } from "../../features/data/data";
import { selectFilteredColumns } from "../../features/columns/columns";
import Cell from "./Cell";

interface RowProps {
  row: RowType;
}

const Row: React.FC<RowProps> = ({ row }) => {
  const columns = useAppSelector(selectFilteredColumns);

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
        alignItems: "center",
      }}
    >
      {columns.map((column) => (
        <Cell data={row[column.id]} type={column.type} width={column.width} />
      ))}
    </Paper>
  );
};

export default Row;
