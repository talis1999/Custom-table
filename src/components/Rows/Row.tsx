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

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("ROW_ID- ", row.id);
  };

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
        transition: "background-color 0.3s ease",
        ":hover": { bgcolor: "#8a9db1", cursor: "pointer" },
      }}
      onClick={handleClick}
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
