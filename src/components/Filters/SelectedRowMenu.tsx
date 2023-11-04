import React from "react";
import { Box, IconButton } from "@mui/material";
import CompressIcon from "@mui/icons-material/CompressOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const SelectedRowMenu: React.FC = () => {
  return (
    <Box
      sx={{
        border: "solid 1px lightGray",
        borderRadius: 5,
        px: 0.5,
        py: "1px",
        display: "flex",
        gap: 0.5,
      }}
    >
      <IconButton aria-label="previos" onClick={() => {}}>
        <CompressIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="previos" onClick={() => {}}>
        <AddIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="previos" onClick={() => {}}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="previos" onClick={() => {}}>
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SelectedRowMenu;
