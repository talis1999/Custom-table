import React from "react";
import { Paper } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import { Row as RowType } from "../../features/data/data";
import { selectFilteredColumns } from "../../features/columns/columns";
import { COLUMNS_PADDING_X } from "../../features/columns/constants";
import Cell from "./Cell";

interface RowProps {
  row: RowType;
}

const Row: React.FC<RowProps> = ({ row }) => {
  const columns = useAppSelector(selectFilteredColumns);

  return (
    <Paper
      variant="outlined"
      square
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        px: COLUMNS_PADDING_X,
        py: 2.5,
        my: "2px",
        alignItems: "center",
        backgroundColor: "#768698",
        borderWidth: 0,
      }}
    >
      {columns.map((column) => (
        <Cell
          key={`cell-${row.id}/${column.id}`}
          data={row[column.id]}
          type={column.type}
          width={column.width}
        />
      ))}
    </Paper>
  );
};

export default Row;
