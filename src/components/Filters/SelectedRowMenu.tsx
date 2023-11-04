import React from "react";
import { Box, IconButton, Divider } from "@mui/material";
import CompressIcon from "@mui/icons-material/CompressOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CancelIcon from "@mui/icons-material/CancelOutlined";

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
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Divider sx={{ my: "-1px" }} orientation="vertical" flexItem />
      <IconButton aria-label="previos" onClick={() => {}}>
        <CancelIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SelectedRowMenu;
