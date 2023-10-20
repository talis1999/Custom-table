import React from "react";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface CellProps {
  data: string | boolean | number;
  type: string;
  width?: number;
}

const Cell: React.FC<CellProps> = ({ data, type, width = 50 }) => {
  return (
    <Box sx={{ width: `${width}px`, px: 1, position: "relative" }}>
      {type === "Boolian" ? (
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
        data
      )}
    </Box>
  );
};

export default Cell;
