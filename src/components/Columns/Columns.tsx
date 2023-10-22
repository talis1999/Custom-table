import React from "react";
import { Box } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import { selectColumns } from "../../features/columns";

import Column from "./Column";

const Columns: React.FC = () => {
  const columns = useAppSelector(selectColumns);

  return (
    <Box
      sx={{
        backgroundColor: "#66788c",
        color: "#F5F7F8",
        px: 3,
        py: 1.5,
        display: "flex",
      }}
    >
      {columns.map((column) => (
        <Column id={column.id} title={column.title} width={column.width} />
      ))}
    </Box>
  );
};

export default Columns;
