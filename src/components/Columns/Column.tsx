import React from "react";
import { Box } from "@mui/material";

import { COLUMN_DEFAULT_WIDTH } from "../../constants/constants";

interface ColumnProps {
  title: string;
  id: string;
  width?: number;
}

const Column: React.FC<ColumnProps> = ({
  title,
  id,
  width = COLUMN_DEFAULT_WIDTH,
}) => {
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