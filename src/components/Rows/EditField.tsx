import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";

import {
  COLUMN_DEFAULT_WIDTH,
  ColumnTypes,
} from "../../features/columns/constants";

interface EditFieldProps {
  data?: string | boolean | number;
  type?: string;
  width?: number;
}

const EditField: React.FC<EditFieldProps> = ({
  data,
  type,
  width = COLUMN_DEFAULT_WIDTH,
}) => {
  return (
    <Box
      sx={{
        width: `${width}px`,
        px: 1,
        py: 1.5,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {data}
    </Box>
  );
};

export default EditField;
