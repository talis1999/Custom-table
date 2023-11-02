import React from "react";
import { Box, IconButton } from "@mui/material";

import { COLUMN_DEFAULT_WIDTH } from "../../constants/constants";

interface ColumnProps {
  title: string;
  width?: number;
}

const Column: React.FC<ColumnProps> = ({
  title,
  width = COLUMN_DEFAULT_WIDTH,
}) => {
  return (
    <Box
      sx={{
        width: `${width}px`,
        px: 1,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      <Box>{title}</Box>
    </Box>
  );
};

export default Column;
