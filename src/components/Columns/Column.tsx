import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowUp from "@mui/icons-material/ArrowDropUpSharp";

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
        gap: "2px",
      }}
    >
      <IconButton aria-label="delete">
        <ArrowUp fontSize="small" />
      </IconButton>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flex: 1,
          fontWeight: "bold",
          position: "relative",
          top: "1px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Column;
