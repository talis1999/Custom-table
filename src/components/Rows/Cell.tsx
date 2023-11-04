import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  COLUMN_DEFAULT_WIDTH,
  ColumnTypes,
} from "../../features/columns/constants";

interface CellProps {
  data: string | boolean | number;
  type: string;
  width?: number;
}

const Cell: React.FC<CellProps> = ({
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
      {type === ColumnTypes.Boolian ? (
        data ? (
          <CheckCircleIcon
            sx={{ color: "#00b894", position: "relative", top: "1px" }}
          />
        ) : (
          <CancelIcon
            sx={{ color: "#e17055", position: "relative", top: "1px" }}
          />
        )
      ) : (
        <Tooltip title={data}>
          <Typography noWrap={true}>{data}</Typography>
        </Tooltip>
      )}
    </Box>
  );
};

export default Cell;
