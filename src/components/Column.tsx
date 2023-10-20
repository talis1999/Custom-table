import React from "react";
import { Box } from "@mui/material";

interface ColumnProps {
  title: string;
  id: string;
  width?: number;
}

const Column: React.FC<ColumnProps> = ({ title, id, width = 50 }) => {
  return (
    <Box
      id={`col-${id}`}
      sx={{
        width: `${width}px`,
        px: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        fontWeight: "bold",
      }}
    >
      {title}
    </Box>
  );
};

export default Column;
