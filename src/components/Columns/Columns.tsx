import React from "react";
import { Box } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import { selectFilteredColumns } from "../../features/columns/columns";

import Column from "./Column";

const Columns: React.FC = () => {
  const columns = useAppSelector(selectFilteredColumns);

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
      {columns.map(({ id, title, width }) => (
        <Column key={`col-${id}`} title={title} width={width} />
      ))}
    </Box>
  );
};

export default Columns;
