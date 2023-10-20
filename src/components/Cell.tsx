import React from "react";
import { Box } from "@mui/material";

interface CellProps {
  data: string | boolean | number;
  type: string;
  width?: number;
}

const Cell: React.FC<CellProps> = ({ data, type, width = 50 }) => {
  return (
    <Box sx={{ width: `${width}px`, px: 1 }}>
      {type === "Boolian" ? "bool" : data}
    </Box>
  );
};

export default Cell;
